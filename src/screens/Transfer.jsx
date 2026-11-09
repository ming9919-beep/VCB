import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { amountToWords, formatVND } from '../data.js'
import { BANKS, loadBanks, resolveBank } from '../banks.js'
import { IconBack, IconChevronDown, IconHomeCircle, IconInfo, IconSearch, IconTemplate } from '../icons.jsx'
import { useStore } from '../store.jsx'

function formatAcc(v) {
  const d = String(v).replace(/\D/g, '')
  if (d.length <= 3) return d
  if (d.length <= 8) return `${d.slice(0, 3)} ${d.slice(3)}`
  return `${d.slice(0, 3)} ${d.slice(3, 8)} ${d.slice(8)}`
}

export default function Transfer() {
  const nav = useNavigate()
  const loc = useLocation()
  const { user, beneficiaries, accounts, sourceId, setSourceId, hideBalance, scannedPayee, setScannedPayee, lookupPayeeName } = useStore()
  const qr = loc.state?.fromQr ? loc.state : scannedPayee
  const draft = loc.state?.draft
  const isQrTransfer = draft ? draft.fromQr : Boolean(qr)
  const [step, setStep] = useState(draft || qr ? 2 : 1)
  const [looking, setLooking] = useState(false)
  const [banks, setBanks] = useState(BANKS)
  const [bank, setBank] = useState(() => resolveBank(draft?.bankBin || draft?.bankId || draft?.bank || qr?.bankId || qr?.bankBin || qr?.bank) || resolveBank('970436') || BANKS[0])
  const [account, setAccount] = useState(draft?.account || qr?.account || '')
  const [name, setName] = useState(draft?.name || qr?.name || '')
  const [amount, setAmount] = useState(draft?.amount ? formatVND(Number(draft.amount)) : qr?.amount ? formatVND(Number(qr.amount)) : '')
  const [memo, setMemo] = useState(draft?.memo ?? qr?.memo ?? `${user.name} Chuyen Tien`)
  const [savePayee, setSavePayee] = useState(draft?.savePayee || false)
  const [pickBank, setPickBank] = useState(false)
  const [pickSrc, setPickSrc] = useState(false)
  const [showLimit, setShowLimit] = useState(false)
  const [showTpl, setShowTpl] = useState(false)
  const [bankQ, setBankQ] = useState('')
  const [q, setQ] = useState('')

  const src = accounts.find((a) => a.id === sourceId) || accounts[0]

  useEffect(() => {
    loadBanks().then((list) => {
      setBanks(list)
      const s = loc.state
      if (s?.fromQr) {
        const hit = resolveBank(s.bankId || s.bankBin || s.bank)
        if (hit) setBank(hit)
      }
    })
  }, [])

  function lookupName(acc, bankName) {
    const key = String(acc || '').replace(/\s/g, '')
    const known = beneficiaries.find((b) => String(b.account).replace(/\s/g, '') === key)
    if (known) return known.name
    const cached = lookupPayeeName(key)
    if (cached) return cached
    if (key === user.accountNoFull) return user.name.toUpperCase()
    return ''
  }

  function applyPayee(s) {
    if (!s?.fromQr && !s?.account) return
    setStep(2)
    const acc = s.account || ''
    setAccount(acc)
    const resolved = (s.name || '').trim() || (s.fromQr ? '' : lookupName(acc, s.bank))
    setName(resolved)
    setMemo(s.memo || `${user.name} Chuyen Tien`)
    if (Number(s.amount) > 0) setAmount(formatVND(Math.round(Number(s.amount))))
    else setAmount('')
    const hit = resolveBank(s.bankId || s.bankBin || s.bank) || {
      id: s.bankId || 'other',
      name: s.bank,
      full: s.bankFull || s.bank,
      bin: s.bankBin || '',
      logo: s.bankLogo || ''
    }
    setBank(hit)
    if (!(s.name || '').trim() && acc && !s.fromQr) {
      setLooking(true)
      setTimeout(() => {
        setName(lookupName(acc, s.bank || hit.name))
        setLooking(false)
      }, 450)
    }
  }

  useEffect(() => {
    if (loc.state?.draft) return
    const s = loc.state?.fromQr ? loc.state : scannedPayee
    if (s) applyPayee(s)
  }, [loc.state, scannedPayee])

  const banksFiltered = useMemo(() => {
    const t = bankQ.trim().toLowerCase()
    if (!t) return banks
    return banks.filter((b) => (b.name + b.full + b.bin + b.code).toLowerCase().includes(t))
  }, [bankQ, banks])
  const filtered = useMemo(
    () => beneficiaries.filter((b) => (b.name + b.account + b.bank).toLowerCase().includes(q.toLowerCase())),
    [q, beneficiaries]
  )
  const amt = Number(String(amount).replace(/\D/g, '')) || 0
  const accountDigits = account.replace(/\D/g, '')
  const isOwnAccount = accountDigits === String(src.number).replace(/\D/g, '')
  const canNext = accountDigits.length >= 6 && accountDigits.length <= 19
    && !isOwnAccount && name.trim() && amt >= 1000 && amt <= 500000000 && amt <= src.balance
    && (!isQrTransfer || (qr?.verified === true && !qr?.nameMismatch))

  function pick(b) {
    setBank(resolveBank(b.bank) || banks[0])
    setAccount(b.account)
    setName(b.name)
    setStep(2)
  }

  function onAmount(v) {
    const n = Number(String(v).replace(/\D/g, '')) || 0
    setAmount(n ? formatVND(n) : '')
  }

  function submit() {
    if (!canNext) return
    const acc = accountDigits
    nav('/confirm', {
      state: {
        kind: 'transfer',
        title: 'Chuyển tiền trong nước',
        amount: amt,
        currency: src.currency,
        successTitle: 'Giao dịch thành công!',
        words: amountToWords(amt),
        rows: [
          { label: 'Hình thức chuyển', value: isQrTransfer ? 'Chuyển tiền trong Vietcombank' : 'Chuyển khoản trong nước' },
          { label: 'Tài khoản nguồn', value: src.number },
          { label: 'Tài khoản nhận', value: formatAcc(acc) },
          { label: 'Tên người nhận', value: name, tone: 'danger' },
          {
            label: 'Ngân hàng nhận',
            value: bank.name,
            sub: bank.full,
            logo: bank.logo || ''
          },
          { label: 'Nội dung', value: memo },
          { label: 'Phí chuyển tiền', value: 'Miễn phí' }
        ],
        action: {
          amount: amt,
          name,
          bank: bank.name,
          account: acc,
          memo,
          savePayee,
          title: `Chuyen tien den ${name}`,
          channel: isQrTransfer ? 'QR Pay' : 'Chuyển khoản'
        },
        draft: {
          fromQr: isQrTransfer,
          account: acc,
          name,
          verified: qr?.verified === true,
          nameMismatch: qr?.nameMismatch === true,
          qrName: qr?.qrName || '',
          bank: bank.name,
          bankId: bank.id,
          bankBin: bank.bin,
          amount: amt,
          memo,
          savePayee
        }
      }
    })
  }

  return (
    <div className="tf-page">
      <div className="tf-head">
        <button className="back" onClick={() => {
          if (step === 2 && qr) {
            setScannedPayee(null)
            nav('/home')
            return
          }
          if (step === 1 || qr) nav(-1)
          else setStep(1)
        }}><IconBack /></button>
        <h1>Chuyển tiền trong nước</h1>
        <button
          className="tf-home"
          onClick={() => {
            if (isQrTransfer) setScannedPayee(null)
            nav('/home')
          }}
          aria-label="home"
        >
          <IconHomeCircle />
        </button>
      </div>

      <div className="scroll tf-scroll">
        {step === 1 && (
          <>
            <div className="search-bar">
              <IconSearch />
              <input placeholder="Tìm người thụ hưởng" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div className="card" style={{ marginBottom: 14 }}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Chuyển đến số tài khoản mới</label>
                <input
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="Nhập số tài khoản"
                  value={account}
                  onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 19))}
                />
              </div>
            </div>
            <div className="section-title" style={{ margin: '4px 0 10px', fontSize: 15 }}>Người thụ hưởng gần đây</div>
            <div className="list">
              {filtered.map((b) => (
                <button key={b.id} className="list-item" onClick={() => pick(b)}>
                  <div className="avatar">{b.name.split(' ').pop()[0]}</div>
                  <div className="li-body">
                    <div className="li-title">{b.name}</div>
                    <div className="li-sub">{b.bank} · {b.account}</div>
                  </div>
                  <div className="muted">{b.last}</div>
                </button>
              ))}
              {filtered.length === 0 && <div className="muted" style={{ textAlign: 'center', padding: 16 }}>Chưa có người thụ hưởng</div>}
            </div>
            {account.length >= 6 && (
              <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setStep(2)}>Tiếp tục</button>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="src-row">
              <button className="src-card" type="button" onClick={() => setPickSrc(true)}>
                <div className="src-line">
                  <span>Tài khoản nguồn</span>
                  <strong>{src.masked || src.number}</strong>
                </div>
                <div className="src-line">
                  <span>Số dư</span>
                  <strong>{hideBalance ? '*** *** *** VND' : `${formatVND(src.balance)} ${src.currency}`}</strong>
                </div>
                <span className="src-chev"><IconChevronDown color="#fff" /></span>
              </button>
              <div className="src-ghost">
                <div>Tài khoản</div>
                <div>Số dư</div>
              </div>
            </div>

            {isQrTransfer && (
              <div className="qr-payee">
                <div className="qr-payee-k">Đã quét mã QR</div>
                <div className="qr-payee-row">
                  <span>{qr?.verified ? 'Tên đã xác minh' : 'Tên trong mã QR'}</span>
                  <strong className={!name ? 'qr-payee-missing' : ''}>
                    {name || qr?.qrName || (looking ? 'Đang truy vấn tên người nhận...' : 'Chưa có tên')}
                  </strong>
                </div>
                {qr?.verified && qr?.nameMismatch && (
                  <div className="qr-payee-verify qr-payee-verify-warning">
                    Tên trên mã QR khác tên đã xác minh: {qr.qrName}
                  </div>
                )}
                <div className={`qr-payee-verify ${qr?.verified && !qr?.nameMismatch ? 'qr-payee-verify-ok' : 'qr-payee-verify-warning'}`}>
                  {qr?.verified
                    ? qr.nameMismatch
                      ? 'Tên tài khoản đã xác minh nhưng không khớp tên trong QR.'
                      : 'Tên tài khoản đã được dịch vụ ngân hàng xác minh.'
                    : qr?.lookupError || 'Tên trong QR chưa được dịch vụ ngân hàng xác minh.'}
                </div>
                <div className="qr-payee-row">
                  <span>Ngân hàng</span>
                  <strong>
                    {bank.name}
                    {bank.full && bank.full !== bank.name && <small>{bank.full}</small>}
                  </strong>
                </div>
                <div className="qr-payee-row">
                  <span>Số tài khoản</span>
                  <strong>{formatAcc(account)}</strong>
                </div>
              </div>
            )}

            <div className="tf-sec">
              <div className="tf-sec-head">
                <div>Thông tin người nhận</div>
                <button className="tf-link" type="button" onClick={() => setShowTpl(true)}>
                  <IconTemplate /> Mẫu chuyển tiền
                </button>
              </div>

              <button className="tf-box" type="button" onClick={() => setPickBank(true)} disabled={isQrTransfer}>
                {bank.logo
                  ? <img className="tf-bank-logo" src={bank.logo} alt="" />
                  : <div className="tf-bank-ico">{(bank.code || bank.name || 'NH').slice(0, 1)}</div>}
                <div className="tf-box-body">
                  <div className="tf-label">Ngân hàng nhận</div>
                  <div className="tf-val">{bank.full || bank.name}</div>
                </div>
                <IconChevronDown color="#888" />
              </button>

              <div className="tf-box">
                <div className="tf-box-body">
                  <div className="tf-label">Tài khoản/thẻ nhận</div>
                  <input
                    className="tf-plain"
                    value={formatAcc(account)}
                    inputMode="numeric"
                    maxLength={23}
                    onChange={(e) => setAccount(e.target.value.replace(/\D/g, '').slice(0, 19))}
                    readOnly={isQrTransfer}
                  />
                </div>
              </div>

              <div className={`tf-box ${isQrTransfer && name ? 'tf-box-muted' : ''}`}>
                <div className="tf-box-body">
                  <div className="tf-label">Tên người nhận</div>
                  <input
                    className="tf-plain"
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 80))}
                    placeholder={looking ? 'Đang truy vấn tên...' : 'Nhập tên người nhận'}
                    readOnly={isQrTransfer || looking}
                  />
                </div>
              </div>
              {isOwnAccount && <div className="login-err" style={{ margin: '-4px 0 10px' }}>Không thể chuyển tiền vào chính tài khoản nguồn</div>}

              <label className="tf-save">
                Lưu người nhận
                <button
                  className={`sw ${savePayee ? 'on' : ''}`}
                  type="button"
                  role="switch"
                  aria-checked={savePayee}
                  aria-label="Lưu người nhận"
                  onClick={() => setSavePayee(!savePayee)}
                />
              </label>
            </div>

            <div className="tf-sec">
              <div className="tf-sec-head">
                <div>Thông tin giao dịch</div>
                <button className="tf-link" type="button" onClick={() => setShowLimit(true)}>
                  <IconInfo /> Hạn mức
                </button>
              </div>

              <div className="tf-box tf-amt">
                <div className="tf-box-body">
                  <div className="tf-label">Số tiền</div>
                  <input
                    className="tf-plain"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => onAmount(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="tf-ccy">VND</div>
              </div>
              {amt > src.balance && <div className="login-err" style={{ margin: '-4px 0 10px' }}>Số dư không đủ</div>}
              {amt > 500000000 && <div className="login-err" style={{ margin: '-4px 0 10px' }}>Số tiền vượt hạn mức 500.000.000 VND mỗi giao dịch</div>}
              {amt > 0 && amt < 1000 && <div className="login-err" style={{ margin: '-4px 0 10px' }}>Số tiền tối thiểu là 1.000 VND</div>}

              <div className="tf-box">
                <div className="tf-box-body">
                  <div className="tf-label">Nội dung</div>
                  <input className="tf-plain" value={memo} onChange={(e) => setMemo(e.target.value)} maxLength={100} />
                </div>
              </div>
            </div>

            <button className="btn-primary tf-submit" disabled={!canNext} onClick={submit}>Tiếp tục</button>
          </>
        )}
      </div>

      {pickBank && (
        <div className="modal-bg" onClick={() => setPickBank(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Chọn ngân hàng nhận</div>
            <div className="search-bar">
              <IconSearch />
              <input placeholder="Tìm ngân hàng, BIN, mã" value={bankQ} onChange={(e) => setBankQ(e.target.value)} />
            </div>
            <div className="list" style={{ maxHeight: 360, overflow: 'auto' }}>
              {banksFiltered.map((b) => (
                <button
                  key={b.bin + b.id}
                  className="list-item"
                  onClick={() => { setBank(b); setPickBank(false) }}
                >
                  {b.logo
                    ? <img className="tf-bank-logo" src={b.logo} alt="" />
                    : <div className="avatar">{b.name[0]}</div>}
                  <div className="li-body">
                    <div className="li-title">{b.name}</div>
                    <div className="li-sub">{b.bin} · {b.full}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {pickSrc && (
        <div className="modal-bg" onClick={() => setPickSrc(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Chọn tài khoản nguồn</div>
            <div className="list">
              {accounts.filter((a) => a.currency === 'VND').map((a) => (
                <button key={a.id} className="list-item" onClick={() => { setSourceId(a.id); setPickSrc(false) }}>
                  <div className="avatar">{a.currency[0]}</div>
                  <div className="li-body">
                    <div className="li-title">{a.name}</div>
                    <div className="li-sub">{a.number}</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 13 }}>{formatVND(a.balance)} VND</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showLimit && (
        <div className="modal-bg" onClick={() => setShowLimit(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title">Hạn mức chuyển tiền</div>
            <div className="kv"><span>Một giao dịch</span><span>500.000.000 VND</span></div>
            <div className="kv"><span>Trong ngày</span><span>2.000.000.000 VND</span></div>
            <div className="kv" style={{ border: 0 }}><span>Tối thiểu</span><span>1.000 VND</span></div>
            <button className="btn-primary" style={{ marginTop: 12 }} onClick={() => setShowLimit(false)}>Đã hiểu</button>
          </div>
        </div>
      )}

      {showTpl && (
        <div className="modal-bg" onClick={() => setShowTpl(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="handle" />
            <div className="li-title" style={{ marginBottom: 10 }}>Mẫu chuyển tiền</div>
            <div className="list">
              {beneficiaries.map((b) => (
                <button key={b.id} className="list-item" onClick={() => { pick(b); setShowTpl(false) }}>
                  <div className="avatar">{b.name.split(' ').pop()[0]}</div>
                  <div className="li-body">
                    <div className="li-title">{b.name}</div>
                    <div className="li-sub">{b.bank} · {b.account}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
