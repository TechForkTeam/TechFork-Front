import { useEffect, useState, type MouseEvent } from "react";

export const useAskForm = () => {
  const [isAsk, setIsAsk] = useState(false);
  const [askContent, setAskContent] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const activeBtn =
    title.length > 2 && content.length > 2 && askContent.length > 0;

  const handleAsk = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    setAskContent(value);
    setIsAsk(false);
  };

  const handleSubmitForm = () => {
    setConfirmModal(true);
    setTitle("");
    setAskContent("");
    setContent("");
  };

  return {
    isAsk,
    askContent,
    title,
    content,
    confirmModal,
    activeBtn,
    setIsAsk,
    setTitle,
    setContent,
    setConfirmModal,
    handleAsk,
    handleSubmitForm,
  };
};
