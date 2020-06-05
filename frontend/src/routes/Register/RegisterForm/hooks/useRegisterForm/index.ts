import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import Joi from "@hapi/joi";
import { register as registerUser } from "services/AuthService";
import lodashGet from "lodash/get";
import useAuth from "hooks/useAuth";
import { useHistory } from "react-router-dom";

type Inputs = {
  Username: string;
  Name: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

const validationSchema = Joi.object({
  Username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  Name: Joi.string().required(),
  Password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  ConfirmPassword: Joi.any()
    .valid(Joi.ref("Password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
    }),
  Email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(256)
    .required(),
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

const useRegisterForm = () => {
  const history = useHistory();
  const { setToken, loading } = useAuth();
  const [ registerError, setRegisterError ] = useState(null);
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    validationResolver,
  });
  const submit = useCallback(
    async (data: Inputs) => {
      try {
        const resp = await registerUser(
          data.Name,
          data.Username,
          data.Email,
          data.Password
        );
        const token = resp.data.accessToken;
        if (token) {
          localStorage.setItem("token", token);
          setToken(token);
          history.push("/user");
        }
      } catch (error) {
        setRegisterError(lodashGet(error, "response.data.message"));
      }
    },
    [setRegisterError, setToken, history]
  );

  return {
    loading: loading || isSubmitting,
    registerError,
    register,
    errors,
    onSubmit: handleSubmit(submit),
  };
};

export default useRegisterForm;
