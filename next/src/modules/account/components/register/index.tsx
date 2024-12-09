"use client"

import { useActionState } from "react"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/common/components/error-message"
import { SubmitButton } from "@modules/common/components/submit-button"
import React from 'react';
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signUp, null)

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
          Register
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-500">
          Enter your details to start your pension process
        </p>
      </div>

      <form action={formAction} className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <Input
          topLabel="RSA Pin"
          name="rsa-pin"
        />

        <div className="mt-8">
          <Input
            topLabel="Surname"
            name="surname"
            type="text"
          />
        </div>

        <div className="mt-8">
          <Input
            topLabel="Email Address"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>

        <div className="flex gap-6 justify-between items-end mt-8 w-full max-md:max-w-full">
          <div className="flex flex-col min-w-[240px] w-[259px]">
            <Input
              topLabel="Password"
              name="password"
              placeholder="password"
              type="password"
              required
            />
          </div>
          <div className="flex flex-col min-w-[240px] w-[259px]">
            <Input
              topLabel="Confirm Password"
              name="confirm-password"
              type="password"
              required
            />
          </div>
        </div>

        <ErrorMessage error={message!} />

        <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
          By creating an account, you agree to our{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <SubmitButton className="overflow-hidden gap-2.5 self-stretch py-3 pr-60 pl-60 w-full text-lg leading-none text-white whitespace-nowrap bg-green-800 max-md:px-5 max-md:max-w-full rounded">Register</SubmitButton>

          <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
            Already have an account or are not a retiree?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="text-green-800 underline"
            >
              Login here
            </button>
          </span>
        </div>
      </form>
    </>
  )
}

export default Register
