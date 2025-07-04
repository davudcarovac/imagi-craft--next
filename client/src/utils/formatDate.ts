import dayjs from "dayjs";

export const formatDate = (date: string | undefined) => {
  const formatted = dayjs(date).format("DD.MM.YYYY. HH:mm");

  return formatted; // 04.07.2025. 11:06
};
