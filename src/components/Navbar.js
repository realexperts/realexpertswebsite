import React from 'react';

import { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Motion, spring, presets } from 'react-motion';

import { Link } from 'gatsby';

import logo from '../img/realexperts-bildmarke.svg';
import logoScrolling from '../img/realexperts-logo-scrolling.svg';
import menu from '../img/icons/menu.svg';
import { useMainMenu } from '../hooks/use-main-menu';
import { usePortfolioMenu } from '../hooks/use-portfolio-menu';

import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

class NavbarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      mobileMenuActive: false,
      menuItems: props.childrenMenu,
      portfolioItems: props.childrenPortfolio,
      scrolling: false,
      toggle: false,
    };
  }

  handleClick() {
    this.setState({ toggle: !this.state.toggle });
    this.toggleClass();
  }

  toggleClass(newState) {
    this.setState({ mobileMenuActive: !this.state.mobileMenuActive });
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    if (window.scrollY === 0 && this.state.scrolling === true) {
      this.setState({ scrolling: false });
    }
    else if (window.scrollY !== 0 && this.state.scrolling !== true) {
      this.setState({ scrolling: true });
    }
  };


  render() {
    const style = {
      overflow: 'visible',
      cursor: 'pointer',
      color: 'white',
      // disable touch highlighting on devices
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
    }

    return (
      <div className={this.state.scrolling ? 'navbar-wrapper navbar-scrolled' : 'navbar-wrapper navbar-at-top'}>
        <nav role="navigation" aria-label="main navigation">
          <Link to="/" className="navigation-bar-logo">
            <figure className="image-top">
              <img src={logo} alt="Real Experts GmbH" />
            </figure>
            <figure className="image-top-scrolling">
              <img src={logoScrolling} alt="Real Experts GmbH" />
            </figure>
          </Link>
          {/*  <img role="button"
               src={menu}
               alt=""
               className="navigation-bar-burger"
               aria-label="menu"
               aria-expanded="false"
               onClick={this.toggleClass}
               onKeyDown={this.toggleClass}>
          </img> */}
          <svg
            viewBox="0 0 96 96"
            className="navigation-bar-burger"
            height="1em"
            aria-label="menu"
            aria-expanded="false"
            onClick={this.handleClick.bind(this)}
            style={style}
            role="button"
          >
            <Motion
              style={{
                x: spring(this.state.toggle ? 1 : 0, presets.gentle),
                y: spring(this.state.toggle ? 0 : 1, presets.gentle),
              }}
            >
              {({ x, y }) =>
                <g
                  id="navicon"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                /* strokeLinecap="round" 
                strokeLinejoin="round" */
                >
                  <line
                    transform={`translate(${x * 12}, ${x * -7}) rotate(${x * 45}, 7, 26)`}
                    x1="7" y1="26" x2="89" y2="26"
                  />
                  <line
                    transform={`translate(0, ${x * 50})`}
                    opacity={y}
                    x1="7" y1="70" x2="89" y2="70"
                  />
                  <line
                    transform={`translate(${x * 27}, ${x * 22}) rotate(${x * -45}, 7, 70)`}
                    x1="7" y1="48" x2="89" y2="48"
                  />
                </g>
              }
            </Motion>
          </svg>
          <div className={`navigation-bar-menu ${this.state.mobileMenuActive ? 'is-active' : 'not-active'}`}>
            {this.state.mobileMenuActive ?
              <Menu className={'navigation-sub-menu'} offsetY={0} arrow={false} align={'center'} viewScroll={'close'} menuButton={<MenuButton className={'menu-button navigation-bar-item'} >Portfolio</MenuButton>}>
                {this.state.portfolioItems}
              </Menu>
              :
              <Menu className={'navigation-sub-menu'} offsetY={-24} arrow={false} align={'center'} viewScroll={'close'} menuButton={<MenuButton className={'menu-button navigation-bar-item'} >Portfolio</MenuButton>}>
                {this.state.portfolioItems}
              </Menu>
            }
            {this.state.menuItems}
          </div>
          {/*  {
      "title": "Digitalisierung & Arbeitsplatz",
      "url": "/portfolio/digitalisierung-und-arbeitsplatz"
    },
    {
      "title": "Mitarbeiter & Führung",
      "url": "/portfolio/mitarbeiter-und-fuehrung"
    }, */}
        </nav>
      </div>
    )
  }
}

const Navbar = () => {

  const {
    settings,
  } = useMainMenu();

  const menuItems = settings.mainMenu.map((item, key) => {
    return (
      <Link to={item.url}
        key={key}
        className="navigation-bar-item"
        activeClassName="is-active">{item.title}
      </Link>
    );
  });

  const {
    settings2,
  } = usePortfolioMenu();

  const portfolioItems = settings2.portfolioMenu.map((item, key) => {
    return (
      <MenuItem key={key} className={"menu-item"}><Link className={"menu-item"} to={item.url}
        activeClassName="is-active">> {item.title}
      </Link>
      </MenuItem>
    );
  });

  return (
    <NavbarComponent childrenMenu={menuItems} childrenPortfolio={portfolioItems} />
  )

};

export default Navbar

