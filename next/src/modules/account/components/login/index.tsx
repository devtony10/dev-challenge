"use client"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logUserIn } from "@modules/account/actions"
import { useActionState } from "react"
import ErrorMessage from "@modules/common/components/error-message"
import { SubmitButton } from "@modules/common/components/submit-button"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(logUserIn, null)

  return (
    <>
      <div className="flex flex-wrap gap-2.5 items-center w-full text-base leading-relaxed text-neutral-500 max-md:max-w-full">
        <img
          loading="lazy"
          src="svg/caret-left.svg"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[0.56] w-[5px]"
        />
        <button className="self-stretch my-auto">Back to home</button>
      </div>

      <div className="flex flex-col mt-7 max-w-full w-[332px]">
        <h1 className="text-5xl font-bold leading-6 text-neutral-950 max-md:text-4xl max-md:leading-6">
          Login
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-500">
          Enter your details to access your account
        </p>
      </div>

      <form action={formAction} className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">

        <div className="flex flex-col justify-between gap-y-4">
          <Input
            topLabel="Email Address"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
          <Input
            topLabel="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        <ErrorMessage error={message!} />

        <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <SubmitButton className="overflow-hidden gap-2.5 self-stretch py-3 pr-60 pl-60 w-full text-lg leading-none text-white whitespace-nowrap bg-green-800 max-md:px-5 max-md:max-w-full rounded">
            Login
          </SubmitButton>

          <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
            Are you a retiree without an account?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="text-green-800 underline"
            >
              Register here
            </button>
          </span>
        </div>
      </form>
    </>
  )
}

export default Login
