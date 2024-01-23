import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../states/TodoListState";
import { Task } from "../types/Task";
import React from "react";
import "../styles/CompletedTodoList.css";
import { ref, remove, update } from "firebase/database";
import { db } from "../FirebaseConfig";
import {
  completedListState,
  completedTodosCount,
} from "../states/CompletedListState";
import { editIdState } from "../states/EditIdState";
import { Box, Text } from "@chakra-ui/react";

export const CompletedTodoList = () => {
  /** 完了Todoの数を取得 */
  const numCompletedTodos = useRecoilValue(completedTodosCount);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const completedList: Task[] = useRecoilValue(completedListState);
  const [editId, setEditId] = useRecoilState(editIdState);

  /** Todoを完了リストから未完了のリストへ移動 */
  const putBackItem = (e: React.MouseEvent, item: Task) => {
    // 更新フォームが開いていたら閉じる。
    setEditId("");
    const editedItem: Task = { ...item, status: "inProgress" };
    updateTodoData(editedItem); // DBを更新
    // 画面上でリストを更新
    const newList = [...todoList];
    setTodoList(
      newList.map((todo) => {
        return todo.id === item.id ? editedItem : todo;
      })
    );
  };

  /** todoをcompleteListより削除する */
  const handleDelete = (e: React.MouseEvent | null, item: Task) => {
    // 更新フォームが開いていたら閉じる。
    setEditId("");
    deleteTodoData(item); // DBより削除
    const newList = [...todoList].filter((todo) => todo.id !== item.id);
    setTodoList(newList); // 画面より削除
  };

  /** Firebase DBのTodoアイテムを削除 */
  const deleteTodoData = async (item: Task) => {
    try {
      const taskRef = ref(db, "tasks/" + item.id);
      remove(taskRef);
    } catch (error) {
      alert("エラー発生。todoは削除されませんでした。");
    }
  };

  /** Firebase DBのTodoの情報を更新 */
  const updateTodoData = async (item: Task) => {
    try {
      const taskRef = ref(db, "tasks/" + item.id);
      update(taskRef, item);
    } catch (error) {
      alert("エラー発生。データが保存されませんでした。");
    }
  };

  return (
    <>
      {numCompletedTodos > 0 && (
        <Box w="950px" mt={10} mx="auto">
          <Text fontSize="1.6rem" textAlign={["center"]} mb={4}>
            完了Todoリスト
          </Text>
          <ul className="CompletedList">
            <li>
              <span className="HdTitle">タイトル</span>
              <span className="HdDetails">内容</span>
              <span className="HdStatus">ステータス</span>
              <span className="HdDeadline">期日</span>
              <span className="HdCreatedAt">記載日</span>
            </li>
            {completedList.map((item: Task) => (
              <li key={item.id}>
                <Box
                  display="flex"
                  alignItems="center"
                  mt={1}
                  backgroundColor="#fafafa"
                  borderRadius="5px"
                  border="#347"
                  p={2}
                >
                  <span className="CompTitle">{item.title}</span>
                  <span className="CompDetails">{item.details}</span>
                  <span className="CompStatus">完了</span>
                  <span className="CompDeadline">{item.deadline}</span>
                  <span className="CompCreatedAt">{item.createdAt}</span>
                  <button
                    className="CompListBtn"
                    onClick={(e: React.MouseEvent) => putBackItem(e, item)}
                  >
                    戻す
                  </button>
                  <button
                    className="CompListBtn"
                    onClick={(e: React.MouseEvent) => handleDelete(e, item)}
                  >
                    削除
                  </button>
                </Box>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </>
  );
};
