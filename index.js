export default function () {
  class Hamburger extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `
        .hamburger {
          display: flex;
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
        
        .hamburger__icon {
          width: 20px;
          height: 10px;
          margin: auto;
        }
        
        .hamburger__line {
          width: 20px;
          height: 2px;
          margin: 0 auto;
          margin-bottom: 2px;
          background-color: ${this.color};
          transform-origin: center;
          animation-duration: 0.7s;
          animation-fill-mode: forwards;
        }
        
        .hamburger__line:last-of-type {
          margin-bottom: 0;
        }
        
        @keyframes lineOneToCross {
          0% {
            transform: translate(0, 0) rotate(0);
          }
          50% {
            transform: translate(0, 200%) rotate(0);
          }
          100% {
            transform: translate(0, 200%) rotate(45deg);
          }
        }
        
        @keyframes lineTwoToCross {
          50%,
          100% {
            visibility: hidden;
          }
        }
        
        @keyframes lineThreeToCross {
          0% {
            transform: translate(0, 0) rotate(0);
          }
          50% {
            transform: translate(0, -200%) rotate(0);
          }
          100% {
            transform: translate(0, -200%) rotate(-45deg);
          }
        }
        
        .hamburger--opened .hamburger__line:first-of-type {
          animation-name: lineOneToCross;
        }
        
        .hamburger--opened .hamburger__line:nth-of-type(2) {
          animation-name: lineTwoToCross;
        }
        
        .hamburger--opened .hamburger__line:last-of-type {
          animation-name: lineThreeToCross;
        }
        
        @keyframes lineOneToHamburger {
          0% {
            transform: translate(0, 200%) rotate(45deg);
          }
          50% {
            transform: translate(0, 200%) rotate(0);
          }
          100% {
            transform: translate(0, 0) rotate(0);
          }
        }
        
        @keyframes lineTwoToHamburger {
          50%,
          100% {
            visibility: visible;
          }
        }
        
        @keyframes lineThreeToHamburger {
          0% {
            transform: translate(0, -200%) rotate(-45deg);
          }
          50% {
            transform: translate(0, -200%) rotate(0);
          }
          100% {
            transform: translate(0, 0) rotate(0);
          }
        }
        
        .hamburger--closed .hamburger__line:first-of-type {
          animation-name: lineOneToHamburger;
        }
        
        .hamburger--closed .hamburger__line:nth-of-type(2) {
          animation-name: lineTwoToHamburger;
        }
        
        .hamburger--closed .hamburger__line:last-of-type {
          animation-name: lineThreeToHamburger;
        }
      `;
      shadow.appendChild(style);

      const elem = document.createElement('div');
      elem.classList.add('hamburger');
      if (this.isOpened) {
        elem.classList.add('hamburger--opened');
        elem.setAttribute('part', 'hamburger--opened');
      } else {
        elem.classList.add('hamburger--closed');
        elem.setAttribute('part', 'hamburger--closed');
      }
      shadow.appendChild(elem);
      this.elem = elem;

      const icon = document.createElement('div');
      icon.classList.add('hamburger__icon');
      elem.appendChild(icon);

      for (let i = 0; i < 3; ++i) {
        const line = document.createElement('div');
        line.classList.add('hamburger__line');
        icon.appendChild(line);
      }
    }

    get isOpened() {
      return this.getAttribute('is-opened') === 'yes';
    }

    get color() {
      return this.getAttribute('color') || '#272b38';
    }

    static get observedAttributes() {
      return ['is-opened'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'is-opened': {
          if (this.isOpened) this.open();
          else this.close();
          break;
        }
      }
    }

    close() {
      this.elem.classList.remove('hamburger--opened');
      this.elem.classList.add('hamburger--closed');
      this.elem.setAttribute('part', 'hamburger--closed');
    }

    open() {
      this.elem.classList.remove('hamburger--closed');
      this.elem.classList.add('hamburger--opened');
      this.elem.setAttribute('part', 'hamburger--opened');
    }
  }

  customElements.define('app-hamburger', Hamburger);
};
