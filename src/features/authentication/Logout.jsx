import { HiArrowRightEndOnRectangle } from 'react-icons/hi2'
import ButtonIcon from '../../ui/ButtonIcon'
import { useLogout } from './useLogout'
import SpinnerMini from '../../ui/SpinnerMini'

const Logout = () => {
    const { isLoading, logout } = useLogout()
    return (
        <ButtonIcon onClick={logout} disabled={isLoading}>{!isLoading ? <HiArrowRightEndOnRectangle /> : <SpinnerMini />}</ButtonIcon>
    )
}

export default Logout