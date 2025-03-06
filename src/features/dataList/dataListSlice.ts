import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { WidgetType } from "../../components/Widgets";

export type DataListType = {
  prefix: string,
  data: WidgetType[],
  asGrid?: "true" | "false"
}

export type DataListFilterType = {
  fieldType: string, 
  fieldName: string, 
  fieldValue: string | string[],
}

export type DataListState = {
  prefix: string,
  data: WidgetType[],
  filteredData: WidgetType[],
  filters: DataListFilterType[]
}

const initialState: DataListState[] = []

export const dataListSlice = createSlice({
  name: 'dataList',
  initialState,
  reducers: {
    setDataList: (state, action: PayloadAction<{data: WidgetType[], prefix: string}>) => {
      if (state.find(el => el.prefix === action.payload.prefix)) {
        state = state.map(el => {
          if (el.prefix === action.payload.prefix) {
            el.data = action.payload.data;
            el.filteredData = action.payload.data;
          }
          return el;
        })
      } else {
        state.push({
          prefix: action.payload.prefix,
          data: action.payload.data,
          filteredData: action.payload.data,
          filters: [],
        })
      }
    },
    filterDataList: (state, action: PayloadAction<{data: WidgetType[], prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
            el.filteredData = action.payload.data;
        }
        return el;
      })
    },
    resetFilterDataList: (state, action: PayloadAction<{prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
          el.filteredData = el.data;
        }
        return el;
      })
    },
    clearDataList: (state, action: PayloadAction<{prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
          el.data = [];
        }
        return el;
      })
    },
    setFilters: (state, action: PayloadAction<{filters: DataListFilterType[], prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
          el.filters = action.payload.filters;
          el.filteredData = el.data.filter(fdata => {
            let valid = true;
            action.payload.filters.forEach(filter => {
              const index = Object.keys(fdata.status.items[0].app).indexOf(filter.fieldName);
              const valueToCompare: string = Object.values(fdata.status.items[0].app)[index] as string;
              const dateFilter = new Date((filter.fieldValue as string))
              const dateToCompare = new Date(valueToCompare)      
              if (index > -1) {
                switch (filter.fieldType) {
                  case "string":
                  case "text":
                  case "textArea": // tested
                    valid = valid && valueToCompare?.toLowerCase().includes((filter.fieldValue as string)?.toLowerCase()) // text, textarea -> include
                    break;
                  case "number": // tested
                    valid = valid && valueToCompare === filter.fieldValue
                    break;
                  case "select": // tested
                    valid = valid && valueToCompare === filter.fieldValue
                    break;
                  case "radioGroup": // tested
                    valid = valid && valueToCompare === filter.fieldValue
                    break;
                  case "checkboxGroup": // tested
                    valid = valid && (filter.fieldValue as string[]).filter(filter => valueToCompare === filter).length > 0
                    break;
                  case "checkbox": // tested send true/false (checked)
                    valid = valid && valueToCompare === filter.fieldValue
                    break;
                  case "datetime": // Needs ISO from K8
                    valid = valid && (dateFilter.getDate() === dateToCompare.getDate() && 
                            dateFilter.getMonth() === dateToCompare.getMonth() && 
                            dateFilter.getFullYear() === dateToCompare.getFullYear()
                            )
                    break;
                  default:
                    valid = valid && valueToCompare === filter.fieldValue
                    break;
                }
              }
            })
            return valid;
          })
        }
        return el;
      })      
    },
    clearFilters: (state, action: PayloadAction<{prefix: string}>) => {
      state = state.map(el => {
        if (el.prefix === action.payload.prefix) {
          el.filters = [];
        }
        return el;
      })
    }
  }
});

export const { setDataList, clearDataList, setFilters, clearFilters } = dataListSlice.actions;

export default dataListSlice.reducer;

export const selectDataList = (state: RootState, prefix: string) => state.dataList?.find(el => el.prefix === prefix)?.filteredData;
export const selectFilters = (state: RootState, prefix: string) => state.dataList?.find(el => el.prefix === prefix)?.filters;