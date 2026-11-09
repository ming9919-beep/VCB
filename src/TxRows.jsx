import { formatVND } from './data.js'

/**
 * Bảng chi tiết giao dịch dùng chung cho màn Xác nhận và màn Kết quả.
 * rows: [{ label, value, tone?, logo?, sub?, danger? }]
 */
export function TxRows({ rows, compact = false }) {
  if (!rows || rows.length === 0) return null
  return (
    <div className={`tx-rows ${compact ? 'tx-rows-compact' : ''}`}>
      {rows.map((r, i) => {
        const last = i === rows.length - 1
        return (
          <div key={`${r.label}-${i}`} className={`tx-row ${last ? 'tx-row-last' : ''} ${r.divider === false ? 'tx-row-nodiv' : ''}`}>
            <div className="tx-row-label">{r.label}</div>
            <div className={`tx-row-value ${r.tone ? `tx-tone-${r.tone}` : ''}`}>
              {r.logo ? (
                <div className="tx-bank">
                  <img className="tx-bank-logo" src={r.logo} alt="" />
                  <div>
                    <div className="tx-bank-name">{r.value}</div>
                    {r.sub && <div className="tx-bank-sub">{r.sub}</div>}
                  </div>
                </div>
              ) : r.sub ? (
                <div>
                  <div>{r.value}</div>
                  <div className="tx-row-sub">{r.sub}</div>
                </div>
              ) : (
                r.value
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Khối hiển thị số tiền (màu đỏ, kèm số tiền bằng chữ) */
export function TxAmount({ amount, currency = 'VND', words, tone = 'danger' }) {
  return (
    <div className="tx-amount-block">
      <div className={`tx-amount tx-amount-${tone}`}>
        {formatVND(amount)} <span className="tx-amount-ccy">{currency}</span>
      </div>
      {words && <div className="tx-amount-words">{words}</div>}
    </div>
  )
}
