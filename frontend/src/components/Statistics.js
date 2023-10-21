import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

function Statistics() {
  const { bid } = useParams();
  let [book, setBook] = useState("");
  const [bookNames, setBookNames] = useState("");
  const [bookQuantity, setBookQuantity] = useState("");
  let [names, setNames] = useState("");
  let [qua, setQua] = useState("");
  let [total, setTotal] = useState("");

  if (total > 0) {
    names = names.split(",");
    qua = qua.split(",");
  }
  let Stats = [names, qua];

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showBook/" + bid)
      .then((res) => {
        book = res.data;
        console.log(book);
        setNames(book.buyerid);
        setQua(book.buyerquantity);
        setTotal(book.selling);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App" style={{ padding: 20 }}>
      <div>
        <div className="container" style={{ marginBottom: 10 }}>
          <div className="row">
            <div className="col-2">Name</div>
            <div className="col-1">Quantity</div>
          </div>
        </div>

        {total > 0 ? (
          <div className="container">
            <div className="row">
              <div className="col-2">
                {Stats[0].map((item) => (
                  <div key={item}>
                    <hr></hr>
                    <span>{item}</span>
                  </div>
                ))}
                <span>Total:</span>
              </div>

              <div className="col-1">
                {Stats[1].map((item) => (
                  <div>
                    <hr></hr>
                    <span>{item}</span>
                  </div>
                ))}
                <span>{total}</span>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default Statistics;
