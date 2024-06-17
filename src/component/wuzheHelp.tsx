// HelpImage.js
import React from 'react'
import _ from './url.js'
export default function HelpImage() {
  return (
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href={_('/css/WuzheHelp.css')} />
      </head>
      <body>
        <div className="box-help">
          <div className="box-help-box">
            <span className="menu-button-flat">武者帮助</span>
            <span className="menu-button">(#|/)踏入武道</span>
            <span className="menu-button">(#|/)个人信息</span>
            <span className="menu-button">(#|/)闭关</span>
            <span className="menu-button">(#|/)结束闭关</span>
            <span className="menu-button">(#|/)开始挖矿</span>
            <span className="menu-button">(#|/)结束挖矿</span>
          </div>
        </div>
      </body>
    </html>
  )
}
