import { useFunction } from "@/helper/context/AppProvider";
import { clearUserError, userSignUp } from "@/helper/redux/slice/auth.slice";
import { useFormik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
export default function Register() {
  const router = useRouter();
  const { error, loading, user } = useSelector((state) => state.auth);
  const { settings, loading: settingLoading } = useFunction();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);
  const handleSubmit = async (values) => {
    dispatch(userSignUp(values));
  };
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object().shape({
      email: string().required("Email is required!").email(),
      password: string().required("Password is required!"),
    }),
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <main>
      <Head>
        <title>Login to DEMM System</title>
      </Head>
      {!settingLoading && (
        <div className="login-container">
          <div className="cover">
            <img src={settings.image} alt="wallpaperaccess" />
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-column align-items-center justify-content-center login-form"
          >
            <h1>DEMM System</h1>
            <span className="text-500">{settings.login_desc}</span>
            <span className="p-float-label login-input mt-5">
              <InputText
                className={formik.errors.email && "p-invalid"}
                id="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <label htmlFor="email">Email</label>
            </span>
            <DisplayErorr
              errors={formik.errors}
              name="email"
              touched={formik.touched}
            />
            <span className="p-float-label login-input mt-5">
              <InputText
                className={formik.errors.password && "p-invalid"}
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <label htmlFor="password">Password</label>
            </span>
            <DisplayErorr
              errors={formik.errors}
              name="password"
              touched={formik.touched}
            />
            {error && (
              <small style={{ width: "350px" }} className="text-red-500">
                {error}
              </small>
            )}
            <div className="flex gap-3 align-items-center mt-4">
              <Button
                loading={loading}
                label="Register"
                icon="pi pi-sign-in"
                type="submit"
              />
              <Button
                type="button"
                text
                label="Already have user?"
                onClick={() => router.push("/login")}
              />
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function DisplayErorr({ errors, name, touched }) {
  if (!errors[name] && touched[name]) return <></>;
  return (
    <div className="text-left" style={{ width: "350px" }}>
      <small className="text-red-500">{errors[name]}</small>
    </div>
  );
}
