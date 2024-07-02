import { useState, FC, useMemo} from "react"
import Order from "./Order";
import { Link, useLocation } from "react-router-dom";
import { ItemType } from "../data";
import { useSelector } from "react-redux";
import { RootStateType } from "../reduxStore";

type HeaderProps = {
  deleteOrder: (id: ItemType['id']) => void,
  plus: (id: ItemType['id']) => void,
  minus: (id: ItemType['id']) => void,
  inAccount: boolean
}

const Header: FC<HeaderProps> = ({deleteOrder, plus, minus, inAccount}) => {

  const [cartOpen, setCartOpen] = useState<boolean>(false)
  const location = useLocation()

  const orders = useSelector((state: RootStateType) => state.shopCart.orders)

  const totalSum = useMemo(() => {
    return orders.reduce((sum, item) => sum + item.price * (item.quantity ?? 0), 0);
  }, [orders]);




  return (
    <header>
        <div>
            <span className='logo'>House Staff</span>

            <ul className="nav">
              <li><Link 
              className={ location.pathname === '/' ? 'menu-link active' : 'menu-link'} 
              to = '/'
              >Главная
              </Link></li>

              <li><Link 
              className={ location.pathname === '/contacts' ? 'menu-link active' : 'menu-link'} 
              to = '/contacts'
              >Контакты
              </Link></li>

              <li><Link 
              className={ location.pathname === '/account' ? 'menu-link active' : 'menu-link'} 
              to = '/account'
              >Кабинет
              </Link></li>
            </ul>

            <img 
            src="/src/images/shopping-basket.png" 
            alt="" 
            onClick={() => setCartOpen(!cartOpen)} 
            className={cartOpen ? "shop-cart-button active" : "shop-cart-button"} 
            />

            {cartOpen && (
              <div className="shop-cart">
                {(orders.length > 0 && inAccount) ?
                <ul>
                  {orders.map(item => 
                  <Order 
                  key={item.id} 
                  item = {item} 
                  onDelete = {deleteOrder} 
                  plus={plus} 
                  minus={minus} 
                  />)}
                  <p className="sum">Сумма: {totalSum.toFixed(2)} RUB</p>
                </ul> :
                <h2 className="empty">В корзине ничего нет!</h2>}
              </div>
            )}
        </div>
        <div className='presentation'>

        </div>
    </header>
  )
}

export default Header
