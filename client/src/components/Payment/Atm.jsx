import valid from "card-validator";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Card from "react-credit-cards-2";
import "react-credit-cards/es/styles-compiled.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { savePaymentMethod } from "../../store/cart/action";
import classes from "./checkout.module.css";

const savedMethod = JSON.parse(localStorage.getItem("payment")) || {};
const initialValues = {
  number: savedMethod.number || "",
  name: savedMethod.name || "",
  expire: savedMethod.expire || "",
  cvc: savedMethod.cvc || "",
};

const validationSchema = Yup.object().shape({
  number: Yup.number()
    .typeError("only number is acceptable")
    .required("card number is required")
    .test("card", "Please provide valid card number", (value) => {
      if (valid.number(value).isPotentiallyValid) {
        return true;
      } else {
        return false;
      }
    }),
  expire: Yup.string()
    .matches(/^\d+$/, "only number is acceptable")
    .required("expire date is required")
    .test(
      "len",
      "Type only correct 4 numbers without space or symbols",
      (val) => String(val).length === 4 && Number(val.substr(0, 2)) <= 12
    ),
  name: Yup.string().required("Name is required"),
  cvc: Yup.number()
    .typeError("provide cvc secret")
    .required("cvc secret is required")
    .min(3, "more then three number"),
});

const Atm = () => {
  const [focus, setFocus] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = (values) => {
    dispatch(savePaymentMethod(values));
    navigate("/place-order");
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ errors, touched, values }) => (
          <>
            <Form className={classes.form}>
              <h3 className={classes.methodLead}>Payment Method</h3>
              <div className={classes.row}>
                <div className={classes.col}>
                  <div className={classes.numberRow}>
                    <Field
                      className={classes.fieldInput}
                      name="number"
                      type="text"
                      placeholder="Card Number"
                      onFocus={(e) => setFocus(e.target.name)}
                    />
                    {errors.number && touched.number && (
                      <div className={classes.error}>{errors.number}</div>
                    )}
                  </div>

                  <div className={classes.nameRow}>
                    <Field
                      className={classes.fieldInput}
                      name="name"
                      type="text"
                      placeholder="Card Holder"
                      onFocus={(e) => setFocus(e.target.name)}
                    />
                    {errors.name && touched.name && (
                      <div className={classes.error}>{errors.name}</div>
                    )}
                  </div>
                  <div className={classes.bottomRow}>
                    <div className={classes.bottomCol}>
                      <Field
                        className={classes.fieldInput}
                        name="expire"
                        type="text"
                        placeholder="MMYY"
                        onFocus={(e) => setFocus(e.target.name)}
                      />
                      {errors.expire && touched.expire && (
                        <div className={classes.error}>{errors.expire}</div>
                      )}
                    </div>
                    <div className={classes.bottomCol}>
                      <Field
                        className={classes.fieldInput}
                        name="cvc"
                        type="text"
                        placeholder="Secret Number"
                        onFocus={(e) => setFocus(e.target.name)}
                      />
                      {errors.cvc && touched.cvc && (
                        <div className={classes.error}>{errors.cvc}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={classes.col}>
                  <Card
                    cvc={values.cvc}
                    expiry={values.expire}
                    focused={focus}
                    name={values.name}
                    number={values.number}
                  />
                </div>
              </div>
              <div className={classes.btnDiv} style={{ marginBottom: "0px" }}>
                <Link
                  to="/shipping"
                  className={classes.button}
                  style={{ background: "gray" }}
                >
                  Back ship
                </Link>
                <input
                  type="submit"
                  className={classes.button}
                  value="continue"
                />
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Atm;
