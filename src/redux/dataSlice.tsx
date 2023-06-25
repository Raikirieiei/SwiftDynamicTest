import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Data {
    key: React.Key;
    name: string;
    gender: string;
    tel_number: number;
    nationality: string;
  }

interface DataState {
  data: Data[];
  nextId: number;
}

const initialState: DataState = {
  data: [],
  nextId: 1,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action: PayloadAction<Data>) => {
    const newData = { ...action.payload, key: state.nextId };
      state.data.push(newData);
      state.nextId++;
    },
    updateData: (state, action: PayloadAction<Data>) => {
        const { key, ...updatedData } = action.payload;
        const dataIndex = state.data.findIndex((item) => item.key === key);
        if (dataIndex !== -1) {
          const updatedArray = [
            ...state.data.slice(0, dataIndex),
            { ...state.data[dataIndex], ...updatedData },
            ...state.data.slice(dataIndex + 1)
          ];
          return {
            ...state,
            data: updatedArray
          };
        }
        return state;
    },
    deleteData: (state, action: PayloadAction<React.Key[]>) => {
        state.data = state.data.filter((item) => !action.payload.includes(item.key));
    },
    deleteOneData: (state, action: PayloadAction<React.Key>) => {
        state.data = state.data.filter(item => item.key !== action.payload);
    },
  },
});

export const { addData, deleteData, deleteOneData, updateData } = dataSlice.actions;
export default dataSlice.reducer;
