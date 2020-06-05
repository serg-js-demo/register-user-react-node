import { useState } from "react";
import { login } from "services/AuthService";
import { useHistory } from "react-router-dom";
import lodashGet from "lodash/get";
import { useForm } from "react-hook-form";
import Joi from "@hapi/joi";
import useAuth from "hooks/useAuth";

type Inputs = {
  Username: string;
  Password: string;
};

const validationSchema = Joi.object({
  Username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const validationResolver = (data: any) => {
  const { error, value: values } = validationSchema.validate(data, {
    abortEarly: false,
  });

  const errors = error
    ? error.details.reduce((previous: any, currentError: any) => {
        return {
          ...previous,
          [currentError.path[0]]: currentError,
        };
      }, {})
    : {};

  return {
    values: error ? {} : values,
    errors: errors,
  };
};

const useLoginForm = () => {
  const history = useHistory();
  const { setToken } = useAuth();
  const [ loginError, setLoginError ] = useState(null);
  const { register, handleSubmit, errors } = useForm<Inputs>({
    validationResolver,
  });
  const onSubmit = (data: Inputs) => {
    login(data.Username, data.Password)
      .then((result) => {
        if (result.data.accessToken) {
          const token = result.data.accessToken;
          localStorage.setItem("token", token);
          setToken(token);
          history.push("/user");
        }
      })
      .catch((error) => {
        console.log("LOGIN ERROR:", error.response);
        setLoginError(lodashGet(error, 'response.data.message'));
      });
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    loginError,
    register,
    errors,
  };
};

export default useLoginForm;
