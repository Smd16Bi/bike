import React from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom';
import { Icon } from '../../ui';
import Modal from '../modal/Modal';
import Form from '../form/Form';
import { useSelector } from 'react-redux';
const links = ["About", "Delivery", "Where to ride"];


const Header = () => {
  const bodyRef = React.useRef(document.querySelector("body"));
  const { isLogin } = useSelector(state => state.user);
  const [open, setOpen] = React.useState(false);
  const [sign, setSign] = React.useState(false)

  const handleOpenMenu = () => {
    setOpen((prev) => !prev);
    const bodyClassList = bodyRef.current.classList;
    bodyClassList.toggle("overflow-scroll", !open);
  };
  const handleOpenForm = () => {
    setSign((prev) => !prev);
  };

  const renderNavLinks = () => {
    return links.map((el, index) => {
      const linkPath = el.replaceAll(" ", "-").toLowerCase();
      const activeClassName = "header-link active";
      const linkClassName = ({ isActive }) =>
        isActive ? activeClassName : "header-link";

      return (
        <li key={`${el}_${index}`} className="header-nav_item">
          <NavLink className={linkClassName} to={`/bike/${linkPath}`}>
            {el}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <header className="header">
      <div className="header-container page-width">
        <div className="header-logo">
          <NavLink to="/bike">
            <Icon type={"logo"} />
          </NavLink>
        </div>
        <nav className="header-nav">
          <ul className="header-nav_list">{renderNavLinks()}</ul>
        </nav>
        <nav className="header-info">
          <ul className="header-info_list">
            <li className="header-info_item">
              <a className="header-info_tel" href="tel:+000 000 000 000">
                +000 000 000 000
              </a>
            </li>
            <li className="header-info_item" onClick={handleOpenForm}>
              {
                !isLogin
                  ? <>
                    <span
                      className="header-info_account"
                    >
                      <Icon type={"account"} />
                    </span>
                    <Modal
                      toggleMode={setSign}
                      visible={sign}
                    >
                      <Form />
                    </Modal>
                  </>
                  :
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active header-info_account" : "header-info_account"
                    }
                    to="/bike/account"
                  >
                    <Icon type={"account"} />
                  </NavLink>
              }
            </li>
          </ul>
        </nav>
        <div className="header-icon" onClick={handleOpenMenu}>
          <Icon type={open ? "close" : "open"} />
        </div>
      </div>

      <div className={open ? "header-mobile show" : "header-mobile"}>
        <nav className="header-mobile_nav">
          <ul className="mobile-nav_list">{renderNavLinks()}</ul>
        </nav>
        <nav className="header-mobile_info">
          <ul className="header-mobile-info_list">
            <li className="header-info_item">
              <a className="header-info_tel" href="tel:+000 000 000 000">
                +000 000 000 000
              </a>
            </li>
            <li className="header-info_item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active header-info_account" : "header-info_account"
                }
                to="/bike/account"
              >
                <Icon type={"account"} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};


export default Header