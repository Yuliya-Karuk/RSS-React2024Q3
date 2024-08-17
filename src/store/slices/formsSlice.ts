import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomFormData } from '../../utils/validationSchema';

type FormsState = {
  forms: CustomFormData[];
};

const initialState: FormsState = {
  forms: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<CustomFormData>) => {
      state.forms.push(action.payload);
    },
  },
});

export const formsReducer = formsSlice.reducer;
export const { addForm } = formsSlice.actions;
