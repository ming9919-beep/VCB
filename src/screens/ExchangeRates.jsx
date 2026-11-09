import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { exchangeRates, formatVND } from '../data.js'
import { IconBack, IconExchange, IconSearch } from '../icons.jsx'

export default function ExchangeRates() {
  const nav = useNavigate()
  const [q, setQ] = useState('')
  const [convFrom, setConvFrom] = useState('USD')
  const [convTo, setConvTo] = useState('VND')
  const [convAmount, setConvAmount] = useState('100')
  const [showFrom, setShowFrom] = useState(false)
  const [showTo, setShowTo] = useState(false)

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return exchangeRates
    return exchangeRates.filter((r) => r.code.toLowerCase().includes(t) || r.name.toLowerCase().includes(t))
  }, [q])

  const convAmt = Number(String(convAmount).replace(/\D/g, '')) || 0
  const fromRate = exchangeRates.find((r) => r.code === convFrom)
  const toRate = exchangeRates.find((r) => r.code === convTo)
  let convResult = 0
  if (convTo === 'VND' && fromRate) {
    convResult = Math.round(convAmt * fromRate.sell)
  } else if (convFrom === 'VND' && toRate) {
    convResult = Math.round(convAmt / toRate.buy)
  } else if (fromRate && toRate) {
    convResult = Math.round(convAmt * fromRate.sell / toRate.buy)
  }

  const currencyList = [{ code: 'VND', name: 'VND', flag: 'VN', buy: 1, sell: 1 }, ...exchangeRates]

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Tỷ giá ngoại tệ</h1>
      </div>
      <div className="scroll" style={{ padding: 16 }}>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <IconExchange size={28} />
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Công cụ chuyển đổi</div>
              <div className="muted" style={{ fontSize: 12 }}>Tỷ giá tham khảo VCB</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <label className="field-label">Số tiền</label>
              <input
                inputMode="numeric"
                value={convAmount}
                onChange={(e) => setConvAmount(e.target.value.replace(/\D/g, ''))}
                style={{ width: '100%', border: '1px solid #e5ece7', borderRadius: 12, padding: '10px 12px', fontSize: 15, fontWeight: 700 }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <button className="conv-currency" onClick={() => setShowFrom(true)}>
              <span className="conv-code">{convFrom}</span>
              <span className="conv-arrow">v</span>
            </button>
            <button className="conv-swap" onClick={() => {
              const tmp = convFrom; setConvFrom(convTo); setConvTo(tmp)
            }}>swap</button>
            <button className="conv-currency" onClick={() => setShowTo(true)}>
              <span className="conv-code">{convTo}</span>
              <span className="conv-arrow">v</span>
            </button>
          </div>
          <div className="conv-result">
            {formatVND(convResult)} {convTo}
          </div>
        </div>

        <div className="search-bar">
          <IconSearch />
          <input placeholder="Tìm ngoại tệ" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>

        <div className="rates-table">
          <div className="rates-head">
            <span>NT</span>
            <span>Mua tiền mặt</span>
            <span>Chuyển khoản</span>
            <span>Bán</span>
          </div>
          {filtered.map((r) => (
            <div key={r.code} className="rates-row">
              <div className="rates-ccy">
                <span className="rates-flag">{r.flag}</span>
                <span className="rates-code">{r.code}</span>
              </div>
              <span>{formatVND(r.buy)}</span>
              <span>{formatVND(r.transfer)}</span>
              <span className="rates-sell">{formatVND(r.sell)}</span>
            </div>
          ))}
        </div>
        <div className="muted" style={{ textAlign: 'center', fontSize: 11, marginTop: 12, padding: '0 8px' }}>
          Tỷ giá chỉ mang tính tham khảo. Liên hệ VCB để biết tỷ giá giao dịch thực tế.
        </div>
      </div>

      {showFrom && (
        <div className="modal-bg" onClick={() => setShowFrom(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Chọn ngoại tệ nguồn</div>
            <div className="list" style={{ maxHeight: 360, overflow: 'auto' }}>
              {currencyList.map((c) => (
                <button key={c.code} className={`list-item ${convFrom === c.code ? 'on' : ''}`} onClick={() => { setConvFrom(c.code); setShowFrom(false) }}>
                  <div className="avatar">{c.flag}</div>
                  <div className="li-body">
                    <div className="li-title">{c.code}</div>
                    <div className="li-sub">{c.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTo && (
        <div className="modal-bg" onClick={() => setShowTo(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Chọn ngoại tệ đích</div>
            <div className="list" style={{ maxHeight: 360, overflow: 'auto' }}>
              {currencyList.map((c) => (
                <button key={c.code} className={`list-item ${convTo === c.code ? 'on' : ''}`} onClick={() => { setConvTo(c.code); setShowTo(false) }}>
                  <div className="avatar">{c.flag}</div>
                  <div className="li-body">
                    <div className="li-title">{c.code}</div>
                    <div className="li-sub">{c.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
