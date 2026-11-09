import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconBack, IconCheck, IconChevron, IconDot, IconIdCard, IconShield } from '../icons.jsx'
import { kycData } from '../data.js'

export default function KYC() {
  const nav = useNavigate()
  const [showDocs, setShowDocs] = useState(false)

  return (
    <>
      <div className="page-head">
        <button className="back" onClick={() => nav(-1)}><IconBack /></button>
        <h1>Định danh eKYC</h1>
      </div>
      <div className="scroll" style={{ paddingBottom: 24 }}>
        {/* Status banner */}
        <div className="kyc-banner">
          <div className="kyc-banner-icon">
            <IconShield size={36} color="#fff" />
          </div>
          <div className="kyc-banner-body">
            <div className="kyc-banner-status">
              <IconCheck size={18} color="#1a9c4a" />
              Đã xác thực
            </div>
            <div className="kyc-banner-level">{kycData.level}</div>
            <div className="kyc-banner-date">Xác thực ngày {kycData.verifiedDate}</div>
          </div>
        </div>

        {/* ID Card info */}
        <div className="section" style={{ marginTop: 14 }}>
          <div className="section-head">
            <div className="section-title">Thông tin định danh</div>
          </div>
          <div className="card kyc-id-card">
            <div className="kyc-id-header">
              <IconIdCard size={24} color="#1a9c4a" />
              <span>Thẻ CCCD</span>
            </div>
            <div className="kv"><span>Số CCCD</span><span className="kyc-mono">{kycData.cccd}</span></div>
            <div className="kv"><span>Ngày cấp</span><span>{kycData.cccdIssueDate}</span></div>
            <div className="kv"><span>Nơi cấp</span><span>{kycData.cccdIssuePlace}</span></div>
            <div className="kv" style={{ border: 0 }}><span>Ngày hết hạn</span><span>{kycData.cccdExpiry}</span></div>
          </div>
        </div>

        {/* Personal info */}
        <div className="section" style={{ marginTop: 14 }}>
          <div className="section-head">
            <div className="section-title">Thông tin cá nhân</div>
          </div>
          <div className="card">
            <div className="kv"><span>Họ và tên</span><span><b>{kycData.fullName}</b></span></div>
            <div className="kv"><span>Ngày sinh</span><span>{kycData.dob}</span></div>
            <div className="kv"><span>Giới tính</span><span>{kycData.gender}</span></div>
            <div className="kv"><span>Quốc tịch</span><span>{kycData.nationality}</span></div>
            <div className="kv"><span>Địa chỉ</span><span style={{ textAlign: 'right', maxWidth: 180 }}>{kycData.address}</span></div>
            <div className="kv"><span>Loại địa chỉ</span><span>{kycData.addressType}</span></div>
            <div className="kv"><span>Mã số thuế</span><span className="kyc-mono">{kycData.taxCode}</span></div>
            <div className="kv" style={{ border: 0 }}><span>Email</span><span>{kycData.email}</span></div>
          </div>
        </div>

        {/* Documents */}
        <div className="section" style={{ marginTop: 14 }}>
          <button className="kyc-docs-toggle" onClick={() => setShowDocs(!showDocs)}>
            <div className="section-title">Tài liệu đã nộp</div>
            <IconChevron size={18} color="#9aa3a0" style={{ transform: showDocs ? 'rotate(90deg)' : '', transition: '0.2s' }} />
          </button>

          {showDocs && (
            <div className="card">
              {kycData.documents.map((doc, i) => (
                <div key={doc.id} className="kyc-doc-item" style={{ borderBottom: i < kycData.documents.length - 1 ? '1px solid #eee' : 'none' }}>
                  <div className="kyc-doc-left">
                    <div className={`kyc-doc-icon ${doc.status}`}>
                      {doc.status === 'verified' ? (
                        <IconCheck size={16} color="#fff" />
                      ) : (
                        <IconDot size={10} color="#ff9800" />
                      )}
                    </div>
                    <div>
                      <div className="kyc-doc-type">{doc.type}</div>
                      {doc.uploadDate && (
                        <div className="kyc-doc-date">Nộp: {doc.uploadDate}</div>
                      )}
                    </div>
                  </div>
                  <span className={`kyc-doc-badge ${doc.status}`}>
                    {doc.status === 'verified' ? 'Đã duyệt' : 'Tùy chọn'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upgrade prompt */}
        <div className="card kyc-upgrade-card">
          <div className="kyc-upgrade-icon">
            <IconShield size={28} color="#1a9c4a" />
          </div>
          <div className="kyc-upgrade-body">
            <div className="kyc-upgrade-title">Nâng cấp định danh</div>
            <div className="kyc-upgrade-desc">
              Tăng hạn mức giao dịch khi hoàn tất xác thực bổ sung. Hạn mức hiện tại: 500.000.000 VND/giao dịch.
            </div>
          </div>
          <button className="kyc-upgrade-btn" onClick={() => nav('/settings')}>
            Nâng cấp
          </button>
        </div>

        {/* Security tips */}
        <div className="card kyc-tips">
          <div className="kyc-tips-title">Bảo mật định danh</div>
          <div className="kyc-tip-item">
            <IconDot size={8} color="#1a9c4a" />
            <span>Không chia sẻ số CCCD/CMND với người lạ</span>
          </div>
          <div className="kyc-tip-item">
            <IconDot size={8} color="#1a9c4a" />
            <span>VCB không yêu cầu OTP qua cuộc gọi điện thoại</span>
          </div>
          <div className="kyc-tip-item">
            <IconDot size={8} color="#1a9c4a" />
            <span>Kiểm tra thông tin định dạng định kỳ tại mục này</span>
          </div>
        </div>
      </div>
    </>
  )
}
