import React, { CSSProperties } from 'react'
import _ from './url.js'
import { Strand } from '../model/index.js'
export default function HelpImage({ data }) {
  const { player, level } = data
  function whenError(image) {
    image.onerror = null
    image.src = 'fallback-image.jpg' // 替换为你的备用图片的路径
  }
  const strand_hp = Strand(player.currentHealth, player.healthBonus)
  const hp = strand_hp.style
  return (
    <html>
      <head>
        <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
        <link
          rel="stylesheet"
          type="text/css"
          href={_('/css/PersonalInformation.css')}
        />
      </head>
      <body>
        <div>
          {' '}
          b<div className="header"></div>
          <div className="card_box">
            <div className="user_top_left">
              <div className="user_top_img_bottom">
                {/* <img className="user_top_img" src="" onError={(e) => whenError(e.target)}/> */}
              </div>
              <div className="user_top_font_left">{level}</div>
            </div>
            <div className="user_top_right">
              <div className="user_top_font_right">道号:{player.name}</div>
              <div className="user_top_font_right">uid:{player.uid}</div>
              <div className="user_top_font_right">
                生命：
                <div className="blood_box">
                  <div className="blood_bar" style={hp}></div>
                  <div className="blood_volume">
                    {player.currentHealth.toFixed(0)}/
                    {player.healthBonus.toFixed(0)}
                  </div>
                </div>
              </div>
              <div className="user_top_font_right">星晶：{player.Stardust}</div>
              <div className="user_top_font_right">
                创建存档时间：{player.timeSaveFileCreation}
              </div>
              <div className="user_top_font_right">宣言：{player.Daohsuan}</div>
            </div>
          </div>
          <div className="card_box">
            <div className="use_data">
              <div className="user_font user_font_title">[基础信息]</div>
              <div className="user_font wupin">
                <div className="item">
                  <div className="item_title font_left">
                    攻击：{player.attackBonus}
                  </div>
                  <div className="item_title font_left">
                    防御：{player.defenseBonus}
                  </div>
                  <div className="item_title font_left">
                    爆伤：{player.criticalStrikeBonus}
                  </div>
                  <div className="item_title font_left">
                    暴击：{(player.criticalHitBonus * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="item">
                  <div className="item_title font_left">
                    生命上限：{player.healthBonus}
                  </div>
                  <div className="item_title font_left">
                    修炼加成：{player.TrainingBonus}
                  </div>
                </div>
              </div>
              <div className="user_font wupin">
                <div className="item">
                  <div className="item_title font_left">
                    {player.灵根 && (
                      <div>
                        灵根：{player.灵根.name}【{player.灵根.品级}】
                        <br />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
