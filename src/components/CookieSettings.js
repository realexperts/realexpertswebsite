import React from 'react';

export default class CookieSettings extends React.Component {
    componentDidMount(){
        const script=document.createElement('script')
        script.src="https://consent.cookiebot.com/178192ac-766f-4cab-a110-039ac99eaf64/cd.js"
        script.async=true;
        script.id="CookieDeclaration";
        script.type="text/javascript";
        this.instance.appendChild(script)
      }

    render() {
        return (
           <div>
            <h3>Cookies</h3>
            <div ref={el => (this.instance = el)}>
            </div>
           </div>
        )
    }
}
