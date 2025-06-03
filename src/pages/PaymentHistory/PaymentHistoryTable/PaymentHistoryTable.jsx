import { BsFillCreditCardFill } from "react-icons/bs";
import PaymentHistoryTableHead from "./PaymentHistoryTableHead";
import moment from "moment/moment";

const PaymentHistoryTable = ({ userBookings }) => {
  const sortedBookings = [...userBookings].sort((a, b) => {
    return moment(b.date).unix() - moment(a.date).unix();
  });

  if (sortedBookings?.length === 0) {
    return (
      <div className="flex h-[55vh] items-center justify-center">
        <h1 className="z-[10] description text-5xl">
          You Haven&apos;t Made Any Payment Yet
        </h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div className="mb-5 flex justify-between gap-2 text-white description text-xl">
        <strong className="z-[100] flex items-center gap-2">
          <BsFillCreditCardFill className="text-2xl" />
          <span>Transactions Count :</span>
          <span>{userBookings?.length}</span>
        </strong>{" "}
      </div>
      <table className="z-[100] table text-center description text-white">
        {/* head */}
        <PaymentHistoryTableHead />
        <tbody className="text-sm">
          {sortedBookings.map((classItem, index) => {
            return (
              <tr className="" key={classItem._id}>
                <td>
                  {index + 1}
                </td>
                <td>
                  <div>
                    <div className="font-bold">{classItem["class-name"]}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{classItem.transactionId}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">
                      {moment(classItem.date).format("dddd, Do MMMM YYYY")}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">
                      {moment(classItem.date).format("hh : mm a")}
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">$ {classItem.classFee}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">Paid</div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>{" "}
      </table>
    </div>
  );
};

export default PaymentHistoryTable;
