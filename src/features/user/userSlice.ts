import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise<GeolocationPosition>(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition()
  console.log(positionObj)

  const position: Position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  }

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position)
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

  // 3) Then we return an object with the data that we are interested in
  return { position, address } //PAYLOAD
})

const userSlice = createSlice({
  name: 'user',
  initialState: { status: 'idle' } as User,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    resetUser(state) {
      state.username = undefined
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position
        state.address = action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      }),
})

export const { updateName, resetUser } = userSlice.actions
export default userSlice.reducer
