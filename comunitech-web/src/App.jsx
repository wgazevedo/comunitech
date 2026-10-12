import { useState } from 'react'
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  HandHeart,
  HeartHandshake,
  Home,
  Leaf,
  LogIn,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import './App.css'

const campaigns = [
  {
    id: 1,
    title: '50 Cestas Básicas',
    category: 'Alimentação',
    description: 'Ajude famílias do Jardim Esperança a atravessarem este mês com mais tranquilidade.',
    raised: 38,
    goal: 50,
    color: 'green',
    icon: 'basket',
  },
  {
    id: 2,
    title: 'Material Escolar',
    category: 'Educação',
    description: 'Uma mochila completa pode abrir caminhos para o futuro de uma criança.',
    raised: 72,
    goal: 100,
    color: 'blue',
    icon: 'book',
  },
  {
    id: 3,
    title: 'Inverno Acolhedor',
    category: 'Proteção',
    description: 'Arrecadamos cobertores e agasalhos para pessoas em situação de vulnerabilidade.',
    raised: 28,
    goal: 40,
    color: 'orange',
    icon: 'warm',
  },
]

const recentCampaigns = [
  { title: '50 Cestas Básicas', category: 'Alimentação', progress: '76%', status: 'Em andamento', tone: 'active' },
  { title: 'Material Escolar', category: 'Educação', progress: '72%', status: 'Em andamento', tone: 'active' },
  { title: 'Inverno Acolhedor', category: 'Proteção', progress: '70%', status: 'Em andamento', tone: 'active' },
  { title: 'Horta Comunitária', category: 'Comunidade', progress: '100%', status: 'Concluída', tone: 'done' },
]

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      <span className="brand-mark"><HeartHandshake size={compact ? 18 : 20} strokeWidth={2.4} /></span>
      <span>Comuni<span>Tech</span></span>
    </div>
  )
}

function Button({ children, variant = 'primary', icon: Icon, ...props }) {
  return <button className={`button button-${variant}`} {...props}>{children}{Icon && <Icon size={17} />}</button>
}

function PublicPage({ onLogin }) {
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  return (
    <div className="public-page">
      <header className="public-header page-shell">
        <Brand />
        <Button variant="outline" icon={LogIn} onClick={onLogin}>Acesso ONG</Button>
      </header>

      <main>
        <section className="hero page-shell">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> Solidariedade que se multiplica</div>
            <h1>Ajude a transformar<br /><em>nossa comunidade.</em></h1>
            <p>Pequenas atitudes criam grandes mudanças. Encontre uma causa para apoiar e faça parte dessa rede.</p>
            <a className="text-link" href="#campaigns">Ver campanhas <ArrowRight size={17} /></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="art-ring ring-one" /><div className="art-ring ring-two" />
            <div className="art-sun"><Leaf size={54} /></div>
            <span className="art-label label-one">+ 1.240 famílias</span>
            <span className="art-label label-two">juntos somos mais</span>
          </div>
        </section>

        <section className="campaign-section page-shell" id="campaigns">
          <div className="section-heading"><div><span className="section-kicker">Escolha uma causa</span><h2>Campanhas ativas</h2></div><span className="campaign-count">{campaigns.length} campanhas</span></div>
          <div className="campaign-grid">
            {campaigns.map((campaign) => {
              const percentage = Math.round((campaign.raised / campaign.goal) * 100)
              return <article className="campaign-card" key={campaign.id}>
                <div className={`campaign-visual visual-${campaign.color}`}><span className="campaign-icon"><HandHeart size={28} /></span><span className="category-pill">{campaign.category}</span></div>
                <div className="campaign-content"><h3>{campaign.title}</h3><p>{campaign.description}</p><div className="progress-row"><span>Arrecadado</span><strong>{percentage}%</strong></div><div className="progress-track"><span style={{ width: `${percentage}%` }} /></div><div className="campaign-footer"><span><b>{campaign.raised}</b> de {campaign.goal} unidades</span><button className="help-button" onClick={() => setSelectedCampaign(campaign)}>Quero ajudar <ChevronRight size={16} /></button></div></div>
              </article>
            })}
          </div>
        </section>
      </main>
      <footer className="public-footer"><div className="page-shell"><Brand compact /><span>Feito para conectar quem quer ajudar.</span></div></footer>
      {selectedCampaign && <div className="toast" role="status"><Check size={18} /> Obrigado por apoiar <strong>{selectedCampaign.title}</strong>!<button onClick={() => setSelectedCampaign(null)} aria-label="Fechar"><X size={16} /></button></div>}
    </div>
  )
}

function LoginPage({ onBack, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return <main className="login-page"><div className="login-decoration"><div className="login-quote"><span className="quote-mark">“</span><p>Quando cuidamos uns dos outros, toda a comunidade floresce.</p><span className="quote-author">ComuniTech</span></div></div><section className="login-panel"><button className="back-link" onClick={onBack}><ArrowRight size={17} className="back-arrow" /> Voltar para o mural</button><div className="login-form-wrap"><Brand /><span className="section-kicker">Área da organização</span><h1>Bem-vindo de volta</h1><p className="login-intro">Acesse seu painel para acompanhar o impacto da sua ONG.</p><form onSubmit={(event) => { event.preventDefault(); onLogin() }}><label htmlFor="email">E-mail<input id="email" type="email" placeholder="nome@organizacao.org" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label htmlFor="password">Senha<input id="password" type="password" placeholder="Digite sua senha" value={password} onChange={(event) => setPassword(event.target.value)} required /></label><div className="form-options"><label className="checkbox-label"><input type="checkbox" /> <span>Lembrar de mim</span></label><a href="#forgot">Esqueci minha senha</a></div><Button type="submit" icon={LogIn}>Entrar no painel</Button></form><p className="login-footnote"><ShieldCheck size={16} /> Seus dados estão protegidos</p></div></section></main>
}

function Sidebar({ active, onNavigate, onLogout, isOpen, onClose }) {
  const links = [{ name: 'Início', icon: Home }, { name: 'Campanhas', icon: BarChart3 }, { name: 'Doadores', icon: Users }]
  return <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}><div className="sidebar-top"><Brand /><button className="icon-button sidebar-close" onClick={onClose} aria-label="Fechar menu"><X size={20} /></button></div><p className="sidebar-label">PAINEL DA ONG</p><nav>{links.map(({ name, icon: Icon }) => <button className={active === name ? 'nav-item active' : 'nav-item'} key={name} onClick={() => { onNavigate(name); onClose() }}><Icon size={19} /> {name}{active === name && <ChevronRight size={16} className="nav-chevron" />}</button>)}</nav><button className="nav-item logout" onClick={onLogout}><LogOut size={19} /> Sair</button></aside>
}

function StatCard({ label, value, detail, icon: Icon, tone }) {
  return <article className="stat-card"><div className={`stat-icon stat-${tone}`}><Icon size={20} /></div><div><p>{label}</p><strong>{value}</strong><span className="stat-detail">{detail}</span></div></article>
}

function NewNeedModal({ onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-header"><div><span className="section-kicker">Nova campanha</span><h2 id="modal-title">Criar necessidade</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar modal"><X size={20} /></button></div><form onSubmit={(event) => { event.preventDefault(); onClose() }}><label htmlFor="need-title">Título<input id="need-title" placeholder="Ex.: Kits de higiene" required /></label><label htmlFor="need-category">Categoria<select id="need-category" defaultValue=""><option value="" disabled>Selecione uma categoria</option><option>Alimentação</option><option>Educação</option><option>Proteção</option><option>Comunidade</option></select></label><label htmlFor="need-goal">Meta<input id="need-goal" type="number" min="1" placeholder="Ex.: 100" required /></label><div className="modal-actions"><Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button><Button type="submit" icon={Plus}>Criar necessidade</Button></div></form></section></div>
}

function DashboardPage({ onLogout }) {
  const [active, setActive] = useState('Início')
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="dashboard"><Sidebar active={active} onNavigate={setActive} onLogout={onLogout} isOpen={menuOpen} onClose={() => setMenuOpen(false)} /><div className="dashboard-main"><header className="dashboard-header"><button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu size={22} /></button><div><span className="dashboard-greeting">Quarta-feira, 08 de outubro de 2026</span><h1>Olá, Instituto Sementes <span>👋</span></h1></div><div className="profile-avatar">IS</div></header><div className="dashboard-content"><div className="dashboard-title-row"><div><span className="section-kicker">Visão geral</span><h2>Resumo da sua atuação</h2></div><Button icon={Plus} onClick={() => setModalOpen(true)}>Nova necessidade</Button></div><div className="stats-grid"><StatCard label="Total arrecadado" value="R$ 18.450" detail="+12,5% este mês" icon={CircleDollarSign} tone="green" /><StatCard label="Campanhas ativas" value="03" detail="2 novas este mês" icon={BarChart3} tone="blue" /><StatCard label="Novos voluntários" value="24" detail="+8 esta semana" icon={Users} tone="yellow" /></div><section className="table-section"><div className="table-heading"><div><h2>Campanhas recentes</h2><p>Acompanhe o andamento das suas necessidades.</p></div><button className="view-all">Ver todas <ArrowRight size={16} /></button></div><div className="table-wrap"><table><thead><tr><th>Campanha</th><th>Progresso</th><th>Status</th><th className="table-action-head">Ação</th></tr></thead><tbody>{recentCampaigns.map((campaign) => <tr key={campaign.title}><td><div className="table-campaign"><span className="table-campaign-icon"><HandHeart size={17} /></span><div><strong>{campaign.title}</strong><span>{campaign.category}</span></div></div></td><td><div className="table-progress"><div className="progress-track"><span style={{ width: campaign.progress }} /></div><span>{campaign.progress}</span></div></td><td><span className={`status status-${campaign.tone}`}><i />{campaign.status}</span></td><td className="table-action"><button aria-label={`Abrir ${campaign.title}`}><ChevronRight size={18} /></button></td></tr>)}</tbody></table></div></section></div></div>{modalOpen && <NewNeedModal onClose={() => setModalOpen(false)} />}</div>
}

function App() {
  const [screen, setScreen] = useState('public')
  if (screen === 'login') return <LoginPage onBack={() => setScreen('public')} onLogin={() => setScreen('dashboard')} />
  if (screen === 'dashboard') return <DashboardPage onLogout={() => setScreen('public')} />
  return <PublicPage onLogin={() => setScreen('login')} />
}

export default App
