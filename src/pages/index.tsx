import { deleteTodo, getTodo, postTodo } from "@/api/todo";
import { Button, Card, CloseButton, Form, InputGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import style from "@/style/todoList.module.scss";
import { useForm } from "react-hook-form";

type list = {
  title: string;
  content: string;
}
export default function Home() {
  const router = useRouter();
  const {data, refetch} = getTodo();
  const {register, watch, reset} = useForm<list>({
      defaultValues: {
        title: "",
        content: "",
      }
    }
  );
  const onSuccess = () => {
    refetch();
  }
  const onCreateSuccess = () => {
    refetch();
    reset();
  }
  const onError = (data) => {
    console.error(data.response.data.message);
  }
  const {mutate: createTodo} = postTodo({onError, onSuccess: onCreateSuccess});
  const {mutate: deleteList} = deleteTodo({onError, onSuccess});

  if (!data) {
    return <>no data</>
  }
  return (
    <>
      <br/>
      <Card style={{width: '18rem'}}>
        <Card.Body>
          <Card.Title>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
              <Form.Control
                placeholder="Title"
                aria-label="Title"
                aria-describedby="basic-addon1"
                {...register("title")}
              />
            </InputGroup>
          </Card.Title>
          <Card.Text>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">content</InputGroup.Text>
              <Form.Control
                placeholder="content"
                aria-label="content"
                aria-describedby="basic-addon1"
                {...register("content")}
              />
            </InputGroup>
          </Card.Text>
          <Button variant="primary" onClick={() => {
            const {title, content} = watch();
            createTodo({title, content});
          }}>{"Create New Todo"}</Button>
        </Card.Body>
      </Card>
      {data.map((item, idx) => {
        return (
          <Card style={{width: '18rem'}} key={idx}>
            {/*<Card.Img variant="top" src="holder.js/100px180"/>*/}
            <Card.Body>
              <div className={style.CloseBtn_wrap}>
                <CloseButton onClick={() => {
                  deleteList({id: item.id});
                }}/>
              </div>
              <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.content}
              </Card.Text>
              <Button variant="primary" onClick={async () => {
                await router.push(`/detail/${item.id}`);
              }}>Go Detail</Button>
            </Card.Body>
          </Card>
        );
      })}
    </>
  )
}
