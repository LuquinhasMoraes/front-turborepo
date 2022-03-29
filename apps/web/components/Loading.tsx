import { observer } from "mobx-react-lite"

const Loading = ( { isShow }) => {
    return (
        isShow &&
        <div className='loading'>
            <h5>Calculando frete...</h5>
        </div>
    )
}

export default observer(Loading)