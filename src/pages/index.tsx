import { getTodo } from "@/api/todo";

export default function Home() {
  const {data} = getTodo();
  if (!data) {
    return <></>
  }
  return (
    <>
      <br/>
      <a onClick={() => {
      }}>asdasdasd</a>
      {data.map(() => {
        return <p>todolist</p>
      })}
    </>
  )
}
