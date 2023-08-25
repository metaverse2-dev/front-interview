import { GetServerSideProps } from "next";
import type { PutTodo } from "@/api/todo";
import { deleteTodo, getTodoDetail, putTodo } from "@/api/todo";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function TodoDetail({id}: { id: number }) {
  const [edit, setEdit] = useState<boolean>(false);
  const {mutate} = putTodo({
    onError: (data) => {
      console.error(data.response.data.message);
    },
    onSuccess: async () => {
      await refetch();
      setEdit(false);
    }
  });
  const {mutate: deleteList} = deleteTodo({
    onError: (data) => {
      console.error(data.response.data.message);
    },
    onSuccess: () => {

    }
  });

  const {data, refetch} = getTodoDetail({id});
  const {watch, register, reset} = useForm<PutTodo>({
    defaultValues: {
      id,
      title: data?.title,
      content: data?.content
    }
  })
  useEffect(() => {
    reset({
      id,
      title: data?.title,
      content: data?.content
    })
  }, [data]);

  if (!data) {
    return <>no data</>;
  }

  return (
    <>
      {edit ?
        (
          <>
            <Button variant="primary" onClick={() => {
              const {id, title, content} = watch();
              mutate({id, title, content} as PutTodo);
            }}>{"Complete"}</Button>
            <Button variant="primary" onClick={() => {
              reset();
              setEdit(false);
            }}>{"Cancel"}</Button>
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
              </Card.Body>
            </Card>
          </>
        )
        :
        (
          <>
            <Button variant="primary" onClick={() => {
              setEdit(true);
            }}>{"Edit"}</Button>
            <Button variant="danger" onClick={() => {
              setEdit(true);
            }}>{"Delete"}</Button>
            <Card style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.content}</Card.Text>
              </Card.Body>
            </Card>
          </>
        )
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  // );
  return {
    props: {
      id: params?.id || null
    },
  };
};