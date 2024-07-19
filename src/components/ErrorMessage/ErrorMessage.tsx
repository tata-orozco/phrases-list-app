import { ReactNode } from "react";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { ErrorWrapper } from "./ErrorMessage.styles";

export default function ErrorMessage({children} : {children: ReactNode}) {
  return (
    <ErrorWrapper>
      <ExclamationCircleIcon />
      {children}
    </ErrorWrapper>
  )
}