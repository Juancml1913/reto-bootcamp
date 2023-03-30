import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { formSlice } from "./form/formSlice";
import { messageSlice } from "./message/messageSlice";
import { optionsSlice } from "./options/optionsSlice";
import { questionsSlice } from "./questions/questionsSlice";
import { studentsSlice } from "./students/studentsSlice";
import { typeDocumentsSlice } from "./typeDocuments/typeDocumentsSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    students: studentsSlice.reducer,
    message: messageSlice.reducer,
    questions: questionsSlice.reducer,
    options: optionsSlice.reducer,
    typeDocuments: typeDocumentsSlice.reducer,
    form: formSlice.reducer,
  },
});
