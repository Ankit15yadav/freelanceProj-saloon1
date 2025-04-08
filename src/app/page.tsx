'use client'
import { useRouter } from 'next/navigation'
import { q } from 'node_modules/framer-motion/dist/types.d-B50aGbjN'
import { useEffect } from 'react'

type Props = {}

const MainPage = (props: Props) => {

  const router = useRouter();

  useEffect(() => {
    router.push("/home")
  }, [])

}

export default MainPage