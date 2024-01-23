import { useRecoilState, useRecoilValue } from "recoil";
import { todoState } from "../states/TodoState";
import { useCallback, useRef, useEffect, useState } from "react";
import { todoListState } from "../states/TodoListState";
import "../styles/AddTodo.css";
import { editIdState } from "../states/EditIdState";
import { Task } from "../types/Task";
import { db } from "../FirebaseConfig";
import { ref, set } from "firebase/database";
import { Box, Text } from "@chakra-ui/react";

/** Todo追加機能を持ち、追加フォーム表示するコンポーネント */
export const AddTodo = () => {
  /** 追加フォーム入力内容を格納する */
  const [todo, setTodo] = useRecoilState(todoState);
  /** Todoのリストを格納 */
  const [todoList, setTodoList] = useRecoilState(todoListState);
  /** 編集中Todoの内容を格納 */
  const editId = useRecoilValue(editIdState);
  /** ステータス type宣言 */
  type Status = "notStarted" | "inProgress" | "done";
  /** タイトルのバリデーション表示 */
  const [error, setError] = useState(false);
  /** 追加フォームのタイトル入力欄にrefを設定 */
  const inputRef: any = useRef(null);

  /** 初回レンダリング時、追加フォームのタイトルにフォーカス */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /** 追加ボタン押下時にTodoをリストに追加する。 */
  const handleAddTask = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // タイトルにスペースのみ登録されている場合バリデーションを表示
      setError(todo.title.replace(/\s+/g, "") === "");
      /** 32桁のuuidを生成 */
      const getUUID = () => {
        const digits = "0123456789abcdef";
        const n = digits.length;
        let uuid = "";
        for (let i = 0; i < 32; i++) {
          uuid += digits[Math.floor(Math.random() * n)];
        }
        return uuid;
      };
      // uuid取得
      const id: string = getUUID();
      // 今日の日付を取得してcreatedAtに格納
      const currDate: Date = new Date();
      const createdAt: string = currDate.toISOString().split("T")[0];
      // ステータスを未着手に設定
      const status: Status = "notStarted";
      // 追加するTodoの内容を格納
      const newTodo: Task = {
        ...todo,
        id,
        status,
        createdAt,
      };
      // Firebase DBにtodoを書き込む
      writeTodoData(newTodo);
      // TodoListにtodoを追加
      setTodoList([...todoList, newTodo]);
      // todo Stateを初期値に戻す。追加フォームも初期状態に戻る
      clearTodo(null);
    },
    [todo, todoList]
  );

  /** 入力内容をtodo Stateに格納。画面に反映される。 */
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const task: Task = { ...todo, [e.target.name]: e.target.value };
      setTodo(task);
    },
    [todo]
  );

  /** 変数todoを初期値に戻す　*/
  const clearTodo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
      // バリデーションが表示されていたら非表示にする。
      setError(false);
      setTodo({
        id: "",
        title: "",
        status: "notStarted",
        details: "",
        deadline: "",
        createdAt: "",
      });
    },
    []
  );

  /** Firebase DBにTodoを追加 */
  const writeTodoData = async (item: Task) => {
    const taskRef = ref(db, "tasks/" + item.id);
    try {
      await set(taskRef, item);
    } catch (error) {
      alert("エラー発生。データは保存されませんでした。");
    }
  };

  return (
    <Box w="920px" marginTop={10} mx="auto" pt={20}>
      <Text fontSize="1.8rem" textAlign="center">
        My Todo List
      </Text>
      {/** 追加フォーム */}
      <form className="AddForm" onSubmit={handleAddTask}>
        <Box display="flex" justifyContent="center" gap="1px">
          <Box>
            <input
              className="inputTitle"
              type="text"
              name="title"
              ref={inputRef}
              onChange={onChange}
              value={todo.title}
              placeholder="タイトル"
              required
            />
            {error && (
              <Text fontSize="0.8rem" color="red" marginTop="1px">
                タイトルは必須です。
              </Text>
            )}
          </Box>
          <input
            type="text"
            name="details"
            onChange={onChange}
            value={todo.details}
            placeholder="内容"
          />
          <input
            type="date"
            name="deadline"
            onChange={onChange}
            value={todo.deadline}
          />
          <button className="AddFormBtn" type="submit" disabled={!!editId}>
            追加
          </button>
          <button className="AddFormBtn" type="button" onClick={clearTodo}>
            クリア
          </button>
        </Box>
      </form>
    </Box>
  );
};
