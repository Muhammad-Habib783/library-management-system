import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faUsers, faFolder, faCheckCircle,
  faPlus, faSearch, faBell, faSignOutAlt,
  faEdit, faTrash, faTachometerAlt, faBookOpen,
  faChartBar, faCog, faUser, faTimes, faEye,
  faArrowUp, faArrowDown, faBars, faExclamationCircle,
  faCalendarAlt, faUndo, faUserPlus, faToggleOn, faToggleOff
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';
import logo from '../assets/images/logo.png';
import emptyImg from '../assets/images/empty.jpg';
import student1 from '../assets/images/student1.jpg';
import student2 from '../assets/images/student2.jpg';
import student3 from '../assets/images/student3.jpg';
import student4 from '../assets/images/student4.jpg';
import librarian from '../assets/images/librarian.jpg';
import dash1 from '../assets/images/dash1.jpg';
import dash2 from '../assets/images/dash2.jpg';
import dash3 from '../assets/images/dash3.jpg';
import dash4 from '../assets/images/dash4.jpg';
import dash5 from '../assets/images/dash5.jpg';
import dash6 from '../assets/images/dash6.jpg';

// Predefined set of beautiful online book covers from Unsplash
const placeholderCovers = [
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1513001900722-370f803f498d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=80'
];

const seededBooks = [
  { _id: 'sb1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 15, isbn: '9780743273565', publishedDate: '1925-04-10', category: 'Fiction', description: 'A classic story of jazz-age romance and tragedy.', coverImage: placeholderCovers[0], available: true },
  { _id: 'sb2', title: 'Atomic Habits', author: 'James Clear', price: 20, isbn: '9780735211292', publishedDate: '2018-10-16', category: 'Self Help', description: 'An easy & proven way to build good habits & break bad ones.', coverImage: placeholderCovers[1], available: false },
  { _id: 'sb3', title: 'Deep Work', author: 'Cal Newport', price: 16, isbn: '9781455586691', publishedDate: '2016-01-05', category: 'Productivity', description: 'Rules for focused success in a distracted world.', coverImage: placeholderCovers[2], available: false },
  { _id: 'sb4', title: 'Sapiens', author: 'Yuval Noah Harari', price: 22, isbn: '9780062316097', publishedDate: '2011-09-04', category: 'History', description: 'A brief history of humankind.', coverImage: placeholderCovers[3], available: false },
  { _id: 'sb5', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 19, isbn: '9780374275631', publishedDate: '2011-10-25', category: 'Psychology', description: 'A detailed exploration of the two systems that drive our choices.', coverImage: placeholderCovers[4], available: true },
  { _id: 'sb6', title: 'Educated', author: 'Tara Westover', price: 17, isbn: '9780399590504', publishedDate: '2018-02-20', category: 'Memoir', description: 'A memoir about a young girl who leaves her survivalist family to go to college.', coverImage: placeholderCovers[5], available: true },
  { _id: 'sb7', title: 'The Silent Patient', author: 'Alex Michaelides', price: 15, isbn: '9781250301697', publishedDate: '2019-02-05', category: 'Thriller', description: 'A shocking psychological thriller about a woman’s act of violence against her husband.', coverImage: placeholderCovers[6], available: true },
  { _id: 'sb8', title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 18, isbn: '9780547928227', publishedDate: '1937-09-21', category: 'Fantasy', description: 'The prelude to the Lord of the Rings series.', coverImage: placeholderCovers[7], available: true }
];

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [search, setSearch] = useState('');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    title: '', author: '', price: '', isbn: '',
    publishedDate: '', category: '', description: '', coverImage: ''
  });

  // Settings Mock State
  const [settings, setSettings] = useState({
    libraryName: 'LibraryHub',
    maxBorrowDays: 14,
    finePerDay: 1.50,
    theme: 'cedar' // 'cedar', 'teal', 'crimson', 'slate'
  });

  // Members Mock State
  const [members, setMembers] = useState([
    { id: 'm1', name: 'Muhammad Habib', email: 'habib@library.com', role: 'Student', status: 'Active', borrowedCount: 1, avatar: student1 },
    { id: 'm2', name: 'Sarah Jenkins', email: 'sarah.j@student.com', role: 'Student', status: 'Active', borrowedCount: 2, avatar: student2 },
    { id: 'm3', name: 'Alex Mercer', email: 'mercer@faculty.com', role: 'Faculty', status: 'Active', borrowedCount: 0, avatar: student3 },
    { id: 'm4', name: 'Emma Watson', email: 'emma@student.com', role: 'Student', status: 'Suspended', borrowedCount: 0, avatar: student4 }
  ]);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [memberForm, setMemberForm] = useState({ name: '', email: '', role: 'Student' });

  // Circulation Mock State
  const [checkouts, setCheckouts] = useState([
    { id: 'c1', bookId: 'sb2', bookTitle: 'Atomic Habits', coverImage: placeholderCovers[1], memberName: 'Sarah Jenkins', memberAvatar: student2, issueDate: '2026-06-10', dueDate: '2026-06-24', status: 'Issued' },
    { id: 'c2', bookId: 'sb3', bookTitle: 'Deep Work', coverImage: placeholderCovers[2], memberName: 'Sarah Jenkins', memberAvatar: student2, issueDate: '2026-06-01', dueDate: '2026-06-15', status: 'Overdue' },
    { id: 'c3', bookId: 'sb4', bookTitle: 'Sapiens', coverImage: placeholderCovers[3], memberName: 'Muhammad Habib', memberAvatar: student1, issueDate: '2026-06-15', dueDate: '2026-06-29', status: 'Issued' }
  ]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueForm, setIssueForm] = useState({ bookId: '', memberId: '' });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const config = { headers: { Authorization: `Bearer ${user?.token}` } };

  // Fetch from backend, seed fallback if empty or error
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/books');
      if (data && data.length > 0) {
        setBooks(data);
      } else {
        setBooks(seededBooks);
      }
    } catch (err) {
      console.log('Error fetching books, utilizing seed data fallback.', err);
      setBooks(seededBooks);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  // Books CRUD Handler
  const openAddModal = () => {
    setEditBook(null);
    setForm({ title: '', author: '', price: '', isbn: '', publishedDate: '', category: '', description: '', coverImage: '' });
    setShowModal(true);
  };

  const openEditModal = (book) => {
    setEditBook(book);
    setForm({
      title: book.title, author: book.author, price: book.price,
      isbn: book.isbn, publishedDate: book.publishedDate?.split('T')[0] || '',
      category: book.category, description: book.description, coverImage: book.coverImage
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Choose random Unsplash cover if empty
    const coverUrl = form.coverImage.trim() || placeholderCovers[Math.floor(Math.random() * placeholderCovers.length)];
    const finalForm = { ...form, coverImage: coverUrl };

    try {
      if (editBook) {
        if (editBook._id.startsWith('sb')) {
          // Update seed book locally
          setBooks(books.map(b => b._id === editBook._id ? { ...b, ...finalForm } : b));
        } else {
          await axios.put(`http://localhost:5000/api/books/${editBook._id}`, finalForm, config);
          fetchBooks();
        }
      } else {
        // Create new book
        try {
          const { data } = await axios.post('http://localhost:5000/api/books', finalForm, config);
          setBooks([data, ...books]);
        } catch (backendErr) {
          // If server fails, simulate locally
          const simulatedNew = { _id: 'sb_' + Date.now(), ...finalForm, available: true };
          setBooks([simulatedNew, ...books]);
        }
      }
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const confirmDelete = (id) => { setDeleteId(id); setShowDeleteConfirm(true); };

  const handleDelete = async () => {
    try {
      if (deleteId.startsWith('sb')) {
        // Delete seed book locally
        setBooks(books.filter(b => b._id !== deleteId));
      } else {
        await axios.delete(`http://localhost:5000/api/books/${deleteId}`, config);
        fetchBooks();
      }
      setShowDeleteConfirm(false);
    } catch (err) {
      alert('Error deleting book');
    }
  };

  // Members CRUD Handler
  const handleAddMember = (e) => {
    e.preventDefault();
    const roleAvatars = { Student: [student1, student2, student4], Faculty: [student3] };
    const avatars = roleAvatars[memberForm.role];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    const newMember = {
      id: 'm_' + Date.now(),
      name: memberForm.name,
      email: memberForm.email,
      role: memberForm.role,
      status: 'Active',
      borrowedCount: 0,
      avatar: randomAvatar
    };
    setMembers([...members, newMember]);
    setShowMemberModal(false);
    setMemberForm({ name: '', email: '', role: 'Student' });
  };

  const handleToggleMemberStatus = (id) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Suspended' : 'Active';
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  // Circulation Issue & Return Handlers
  const handleIssueBook = (e) => {
    e.preventDefault();
    const book = books.find(b => b._id === issueForm.bookId);
    const member = members.find(m => m.id === issueForm.memberId);
    if (!book || !member) return;

    // Simulate issuing transaction
    const newCheckout = {
      id: 'c_' + Date.now(),
      bookId: book._id,
      bookTitle: book.title,
      coverImage: book.coverImage || placeholderCovers[0],
      memberName: member.name,
      memberAvatar: member.avatar,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + settings.maxBorrowDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Issued'
    };

    setCheckouts([newCheckout, ...checkouts]);
    setBooks(books.map(b => b._id === book._id ? { ...b, available: false } : b));
    setMembers(members.map(m => m.id === member.id ? { ...m, borrowedCount: m.borrowedCount + 1 } : m));
    setShowIssueModal(false);
    setIssueForm({ bookId: '', memberId: '' });
  };

  const handleReturnBook = (checkoutId) => {
    const checkout = checkouts.find(c => c.id === checkoutId);
    if (!checkout) return;

    setCheckouts(checkouts.map(c => c.id === checkoutId ? { ...c, status: 'Returned' } : c));
    setBooks(books.map(b => b._id === checkout.bookId ? { ...b, available: true } : b));
    setMembers(members.map(m => m.name === checkout.memberName ? { ...m, borrowedCount: Math.max(0, m.borrowedCount - 1) } : m));
  };

  // Filter items
  const filteredBooks = books.filter(book =>
    book.title?.toLowerCase().includes(search.toLowerCase()) ||
    book.author?.toLowerCase().includes(search.toLowerCase()) ||
    book.category?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredMembers = members.filter(m =>
    m.name?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase()) ||
    m.role?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCheckouts = checkouts.filter(c =>
    c.bookTitle?.toLowerCase().includes(search.toLowerCase()) ||
    c.memberName?.toLowerCase().includes(search.toLowerCase())
  );

  // Statistics
  const availableBooks = books.filter(b => b.available !== false).length;
  const categoriesCount = [...new Set(books.map(b => b.category).filter(Boolean))].length;
  const activeIssues = checkouts.filter(c => c.status === 'Issued' || c.status === 'Overdue').length;
  const overdueCount = checkouts.filter(c => c.status === 'Overdue').length;

  const stats = [
    { icon: faBook, label: 'Total Books', value: books.length, color: 'stat-brown', trend: '+12%', sub: 'books registered' },
    { icon: faCheckCircle, label: 'Available', value: availableBooks, color: 'stat-green', trend: '+5%', sub: 'books ready to loan' },
    { icon: faBookOpen, label: 'Active Loans', value: activeIssues, color: 'stat-orange', trend: '+3%', sub: 'currently borrowed' },
    { icon: faUsers, label: 'Total Users', value: members.length, color: 'stat-blue', trend: '+8%', sub: 'members enrolled' },
  ];

  const navItems = [
    { icon: faTachometerAlt, label: 'Dashboard', key: 'dashboard' },
    { icon: faBook, label: 'Books', key: 'books' },
    { icon: faBookOpen, label: 'Circulation', key: 'circulation' },
    { icon: faUsers, label: 'Members', key: 'members' },
    { icon: faChartBar, label: 'Reports', key: 'reports' },
    { icon: faCog, label: 'Settings', key: 'settings' },
  ];

  return (
    <div className={`dash-page theme-${settings.theme} ${sidebarOpen ? '' : 'sidebar-closed'}`}>

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="LibraryHub" />
          {sidebarOpen && <span>{settings.libraryName}</span>}
        </div>

        <div className="sidebar-user">
          <img src={librarian} alt="User Avatar" className="sidebar-avatar-img" />
          {sidebarOpen && (
            <div className="sidebar-user-info">
              <h4>{user?.name || 'Administrator'}</h4>
              <span>Senior Librarian</span>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeNav === item.key ? 'active' : ''}`}
              onClick={() => setActiveNav(item.key)}
            >
              <FontAwesomeIcon icon={item.icon} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="dash-main">

        {/* TOP HEADER */}
        <header className="dash-header">
          <div className="header-left">
            <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="header-title">
              <h1>
                {activeNav === 'dashboard' && 'Dashboard Overview'}
                {activeNav === 'books' && 'Books Directory'}
                {activeNav === 'circulation' && 'Circulation Desk'}
                {activeNav === 'members' && 'Member Directory'}
                {activeNav === 'reports' && 'Reports & Analytics'}
                {activeNav === 'settings' && 'Library Settings'}
              </h1>
              <p>Welcome back, {user?.name || 'Administrator'}!</p>
            </div>
          </div>
          <div className="header-right">
            <div className="header-search">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder={
                  activeNav === 'members' ? "Search members..." :
                  activeNav === 'circulation' ? "Search transactions..." :
                  "Search books, authors, categories..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="header-bell">
              <FontAwesomeIcon icon={faBell} />
              {overdueCount > 0 && <span className="bell-dot"></span>}
            </button>
            <img src={librarian} alt="Avatar" className="header-avatar-img" />
          </div>
        </header>

        {/* CONTENT PANELS */}
        <div className="dash-content">

          {/* ========================================================================= */}
          {/* TAB: DASHBOARD */}
          {/* ========================================================================= */}
          {activeNav === 'dashboard' && (
            <div className="tab-pane fade-in">
              {/* STATS */}
              <div className="stats-row">
                {stats.map((s, i) => (
                  <div className={`stat-card ${s.color}`} key={i}>
                    <div className="stat-card-left">
                      <p className="stat-card-label">{s.label}</p>
                      <h2 className="stat-card-value">{s.value}</h2>
                      <span className="stat-trend">
                        <FontAwesomeIcon icon={faArrowUp} /> {s.trend}
                      </span>
                      <p className="stat-card-subtext">{s.sub}</p>
                    </div>
                    <div className="stat-card-icon">
                      <FontAwesomeIcon icon={s.icon} />
                    </div>
                  </div>
                ))}
              </div>

              {/* DUAL COLUMNS: ANALYTICS & CAPACITY */}
              <div className="analytics-grid">
                {/* SVG Area Chart */}
                <div className="analytics-card">
                  <div className="card-header">
                    <h3>Weekly Borrowing Traffic</h3>
                    <span>Checkouts (Jan - Jun)</span>
                  </div>
                  <div className="chart-wrapper">
                    <svg viewBox="0 0 500 200" className="area-chart">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#f0e6d8" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="#f0e6d8" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="140" x2="500" y2="140" stroke="#f0e6d8" strokeWidth="0.5" strokeDasharray="4" />
                      {/* Area Path */}
                      <path d="M 0 160 Q 80 120 120 140 T 250 80 T 380 90 T 500 50 L 500 180 L 0 180 Z" fill="url(#chartGrad)" />
                      {/* Line Path */}
                      <path d="M 0 160 Q 80 120 120 140 T 250 80 T 380 90 T 500 50" fill="none" stroke="var(--primary)" strokeWidth="3" />
                      {/* Points */}
                      <circle cx="120" cy="140" r="5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                      <circle cx="250" cy="80" r="5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                      <circle cx="380" cy="90" r="5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                      <circle cx="500" cy="50" r="5" fill="var(--primary)" stroke="white" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div className="chart-labels">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                  </div>
                </div>

                {/* Storage Capacity (Progress Ring) */}
                <div className="analytics-card flex-center">
                  <div className="card-header width-100">
                    <h3>Library Storage Capacity</h3>
                    <span>Active shelves occupancy</span>
                  </div>
                  <div className="progress-ring-wrap">
                    <svg className="progress-ring" width="120" height="120">
                      <circle className="progress-ring-circle-bg" stroke="#f0e6d8" strokeWidth="10" fill="transparent" r="50" cx="60" cy="60" />
                      <circle className="progress-ring-circle" stroke="var(--primary)" strokeWidth="10" strokeDasharray="314.15" strokeDashoffset="69.1" fill="transparent" r="50" cx="60" cy="60" />
                    </svg>
                    <div className="progress-text">
                      <h4>78%</h4>
                      <span>Shelves Full</span>
                    </div>
                  </div>
                  <div className="progress-details width-100">
                    <div className="prog-bar-row">
                      <span>Fiction Section</span>
                      <div className="bar-container"><div className="bar-fill" style={{ width: '85%' }}></div></div>
                      <span>85%</span>
                    </div>
                    <div className="prog-bar-row">
                      <span>Academics Section</span>
                      <div className="bar-container"><div className="bar-fill" style={{ width: '62%' }}></div></div>
                      <span>62%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM COLUMNS: RECENT LOG & QUICK ACTIONS */}
              <div className="dashboard-bottom-grid">
                {/* Recent Activities */}
                <div className="activity-card">
                  <h3>Recent Activities</h3>
                  <div className="activity-list">
                    {checkouts.slice(0, 3).map((c, i) => (
                      <div className="activity-item" key={i}>
                        <img src={c.memberAvatar} alt="Avatar" className="activity-avatar" />
                        <div className="activity-desc">
                          <p><strong>{c.memberName}</strong> borrowed <strong>{c.bookTitle}</strong></p>
                          <span>Issued on {c.issueDate}</span>
                        </div>
                        <span className={`badge ${c.status === 'Overdue' ? 'danger' : 'success'}`}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Alerts */}
                <div className="alerts-card">
                  <h3>System Status & Warnings</h3>
                  <div className="alert-box danger">
                    <FontAwesomeIcon icon={faExclamationCircle} className="alert-icon" />
                    <div>
                      <h4>Overdue Items Pending</h4>
                      <p>{overdueCount} book checkout leases have exceeded their timeline policies.</p>
                    </div>
                  </div>
                  <div className="alert-box info">
                    <FontAwesomeIcon icon={faCalendarAlt} className="alert-icon" />
                    <div>
                      <h4>Fines Policy Active</h4>
                      <p>Overdue books are currently accumulating standard fines of ${settings.finePerDay.toFixed(2)}/day.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIBRARY VISUAL SHOWCASE GALLERY */}
              <div className="gallery-section margin-top-32">
                <div className="card-header">
                  <h3>Library Campus Visual Showcase</h3>
                  <span>Current visual records of library wings & halls</span>
                </div>
                <div className="gallery-grid">
                  <div className="gallery-item">
                    <img src={dash1} alt="Main Study Hall" />
                    <div className="gallery-overlay">
                      <h4>Main Study Hall</h4>
                      <p>Open 24/7 with high-speed internet & power outlets</p>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src={dash2} alt="Archive Collection" />
                    <div className="gallery-overlay">
                      <h4>Rare Manuscripts Wing</h4>
                      <p>Climate-controlled preservation archives</p>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src={dash3} alt="Collaborative Room" />
                    <div className="gallery-overlay">
                      <h4>Group Discussion Labs</h4>
                      <p>Equipped with presentation screens & whiteboards</p>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src={dash4} alt="Digital Commons" />
                    <div className="gallery-overlay">
                      <h4>Digital Commons Lounge</h4>
                      <p>Workstations for coding & online research</p>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src={dash5} alt="Cozy Reading Nook" />
                    <div className="gallery-overlay">
                      <h4>Cozy Reading Lounge</h4>
                      <p>Relaxed seating area with hot beverage access</p>
                    </div>
                  </div>
                  <div className="gallery-item">
                    <img src={dash6} alt="Periodical Stacks" />
                    <div className="gallery-overlay">
                      <h4>Periodical Stacks</h4>
                      <p>Magazines, journals, and daily newspapers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: BOOKS */}
          {/* ========================================================================= */}
          {activeNav === 'books' && (
            <div className="tab-pane fade-in">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Book <span>Collection</span></h2>
                  <p className="section-sub">{filteredBooks.length} books found in the system</p>
                </div>
                <button className="add-book-btn" onClick={openAddModal}>
                  <FontAwesomeIcon icon={faPlus} /> Add New Book
                </button>
              </div>

              {loading ? (
                <div className="dash-loading">
                  <div className="dash-spinner"></div>
                  <p>Loading catalog database...</p>
                </div>
              ) : filteredBooks.length === 0 ? (
                <div className="dash-empty animate-pulse">
                  <img src={emptyImg} alt="No books" />
                  <h3>No Books Registered</h3>
                  <p>Your library is empty. Click the button to add a book.</p>
                  <button className="add-book-btn" onClick={openAddModal}>
                    <FontAwesomeIcon icon={faPlus} /> Add Your First Book
                  </button>
                </div>
              ) : (
                <div className="books-grid">
                  {filteredBooks.map((book) => (
                    <div className="book-card" key={book._id}>
                      <div className="book-cover">
                        <img src={book.coverImage || placeholderCovers[0]} alt={book.title} />
                        <div className="book-overlay">
                          <button className="overlay-btn edit" onClick={() => openEditModal(book)}><FontAwesomeIcon icon={faEdit} /></button>
                          <button className="overlay-btn delete" onClick={() => confirmDelete(book._id)}><FontAwesomeIcon icon={faTrash} /></button>
                        </div>
                        <span className={`book-badge ${book.available !== false ? 'available' : 'unavailable'}`}>
                          {book.available !== false ? 'Available' : 'Issued'}
                        </span>
                      </div>
                      <div className="book-info">
                        <span className="book-cat">{book.category || 'General'}</span>
                        <h3 className="book-title" title={book.title}>{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <div className="book-footer">
                          <span className="book-price">${book.price}</span>
                          <span className="book-isbn">ISBN: {book.isbn}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: CIRCULATION */}
          {/* ========================================================================= */}
          {activeNav === 'circulation' && (
            <div className="tab-pane fade-in">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Circulation <span>Desk</span></h2>
                  <p className="section-sub">Active issue slips, returns, and overdue leases</p>
                </div>
                <button className="add-book-btn" onClick={() => setShowIssueModal(true)}>
                  <FontAwesomeIcon icon={faPlus} /> Issue Book to Member
                </button>
              </div>

              <div className="circ-stats-row">
                <div className="circ-stat-card border-orange">
                  <h4>{activeIssues}</h4>
                  <span>Active Leases</span>
                </div>
                <div className="circ-stat-card border-red">
                  <h4>{overdueCount}</h4>
                  <span>Overdue Items</span>
                </div>
                <div className="circ-stat-card border-green">
                  <h4>{((checkouts.filter(c => c.status === 'Returned').length / checkouts.length) * 100).toFixed(0)}%</h4>
                  <span>Return Success Rate</span>
                </div>
              </div>

              <div className="table-wrapper">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Book</th>
                      <th>Borrower</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCheckouts.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">No borrowing transactions registered.</td>
                      </tr>
                    ) : (
                      filteredCheckouts.map((c) => (
                        <tr key={c.id}>
                          <td>
                            <div className="table-book">
                              <img src={c.coverImage} alt="Cover" className="table-book-cover" />
                              <div>
                                <h5>{c.bookTitle}</h5>
                                <span>ID: {c.bookId}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="table-user">
                              <img src={c.memberAvatar} alt="Avatar" className="table-user-avatar" />
                              <span>{c.memberName}</span>
                            </div>
                          </td>
                          <td>{c.issueDate}</td>
                          <td>{c.dueDate}</td>
                          <td>
                            <span className={`badge ${
                              c.status === 'Returned' ? 'secondary' :
                              c.status === 'Overdue' ? 'danger animate-pulse' :
                              'success'
                            }`}>{c.status}</span>
                          </td>
                          <td>
                            {c.status !== 'Returned' && (
                              <button className="return-btn" onClick={() => handleReturnBook(c.id)}>
                                <FontAwesomeIcon icon={faUndo} /> Return
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: MEMBERS */}
          {/* ========================================================================= */}
          {activeNav === 'members' && (
            <div className="tab-pane fade-in">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Library <span>Members</span></h2>
                  <p className="section-sub">Manage library membership registration card registers</p>
                </div>
                <button className="add-book-btn" onClick={() => setShowMemberModal(true)}>
                  <FontAwesomeIcon icon={faUserPlus} /> Add New Member
                </button>
              </div>

              <div className="members-grid">
                {filteredMembers.map((m) => (
                  <div className="member-card" key={m.id}>
                    <img src={m.avatar} alt={m.name} className="member-avatar-img" />
                    <h3 className="member-name">{m.name}</h3>
                    <p className="member-email">{m.email}</p>
                    <div className="member-meta">
                      <span className={`badge ${m.role === 'Faculty' ? 'indigo' : 'blue'}`}>{m.role}</span>
                      <span className={`badge ${m.status === 'Active' ? 'success' : 'danger'}`}>{m.status}</span>
                    </div>
                    <div className="member-stats">
                      <div>
                        <h4>{m.borrowedCount}</h4>
                        <span>Books Borrowed</span>
                      </div>
                    </div>
                    <div className="member-actions">
                      <button className="member-btn suspend-btn" onClick={() => handleToggleMemberStatus(m.id)}>
                        <FontAwesomeIcon icon={m.status === 'Active' ? faToggleOn : faToggleOff} /> {m.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                      <button className="member-btn delete-btn" onClick={() => handleDeleteMember(m.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: REPORTS */}
          {/* ========================================================================= */}
          {activeNav === 'reports' && (
            <div className="tab-pane fade-in">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Analytics & <span>Reports</span></h2>
                  <p className="section-sub">Library performance metrics and monthly target lines</p>
                </div>
              </div>

              {/* TARGET LOADING BARS */}
              <div className="reports-row">
                <div className="report-metric-card">
                  <div className="card-header">
                    <h4>Checkout Target (Monthly)</h4>
                    <span>75% Achieved</span>
                  </div>
                  <div className="loading-bar-wrapper">
                    <div className="loading-bar-fill animate-progress" style={{ width: '75%', '--target-width': '75%' }}></div>
                  </div>
                  <p className="metric-footer">Goal: 500 Checkouts / Current: 375</p>
                </div>

                <div className="report-metric-card">
                  <div className="card-header">
                    <h4>Member Acquisition</h4>
                    <span>90% Achieved</span>
                  </div>
                  <div className="loading-bar-wrapper">
                    <div className="loading-bar-fill animate-progress" style={{ width: '90%', '--target-width': '90%' }}></div>
                  </div>
                  <p className="metric-footer">Goal: 50 Students / Current: 45</p>
                </div>

                <div className="report-metric-card">
                  <div className="card-header">
                    <h4>New Catalog Expansion</h4>
                    <span>45% Achieved</span>
                  </div>
                  <div className="loading-bar-wrapper">
                    <div className="loading-bar-fill animate-progress" style={{ width: '45%', '--target-width': '45%' }}></div>
                  </div>
                  <p className="metric-footer">Goal: 40 Books / Current: 18</p>
                </div>
              </div>

              {/* POPULAR BOOKS & GENERAL SUMMARY */}
              <div className="analytics-grid margin-top-32">
                <div className="analytics-card">
                  <h3>Top Borrowed Books</h3>
                  <div className="popular-books-list">
                    <div className="popular-book-item">
                      <span className="rank-num">#1</span>
                      <img src={placeholderCovers[1]} alt="Book Cover" className="popular-cover" />
                      <div className="popular-desc">
                        <h4>Atomic Habits</h4>
                        <span>James Clear • 82 Borrows</span>
                      </div>
                      <div className="popular-badge">Top Fiction</div>
                    </div>
                    <div className="popular-book-item">
                      <span className="rank-num">#2</span>
                      <img src={placeholderCovers[2]} alt="Book Cover" className="popular-cover" />
                      <div className="popular-desc">
                        <h4>Deep Work</h4>
                        <span>Cal Newport • 64 Borrows</span>
                      </div>
                      <div className="popular-badge">Productivity</div>
                    </div>
                    <div className="popular-book-item">
                      <span className="rank-num">#3</span>
                      <img src={placeholderCovers[3]} alt="Book Cover" className="popular-cover" />
                      <div className="popular-desc">
                        <h4>Sapiens</h4>
                        <span>Yuval Noah Harari • 55 Borrows</span>
                      </div>
                      <div className="popular-badge">Anthropology</div>
                    </div>
                  </div>
                </div>

                <div className="analytics-card">
                  <h3>Borrowing Demographics</h3>
                  <div className="demographics-wrap">
                    <svg viewBox="0 0 200 200" className="doughnut-chart">
                      <circle cx="100" cy="100" r="70" fill="transparent" stroke="#f0e6d8" strokeWidth="20" />
                      {/* Segment: Students 70% */}
                      <circle cx="100" cy="100" r="70" fill="transparent" stroke="var(--primary)" strokeWidth="20" strokeDasharray="439.8" strokeDashoffset="131.9" strokeLinecap="round" />
                    </svg>
                    <div className="doughnut-text">
                      <h4>70%</h4>
                      <span>Student Share</span>
                    </div>
                  </div>
                  <div className="demographic-legend">
                    <div className="legend-item"><span className="dot bg-primary"></span> Students (70%)</div>
                    <div className="legend-item"><span className="dot bg-beige"></span> Faculty & Staff (30%)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB: SETTINGS */}
          {/* ========================================================================= */}
          {activeNav === 'settings' && (
            <div className="tab-pane fade-in">
              <div className="section-header">
                <div>
                  <h2 className="section-title">Library <span>Settings</span></h2>
                  <p className="section-sub">Configure global library rules and branding properties</p>
                </div>
              </div>

              <div className="settings-box">
                <form className="settings-form" onSubmit={(e) => { e.preventDefault(); alert('Settings successfully updated!'); }}>
                  <h3>System Branding</h3>
                  <div className="form-group margin-bottom-20">
                    <label>Library Console Name</label>
                    <input
                      type="text"
                      value={settings.libraryName}
                      onChange={(e) => setSettings({ ...settings, libraryName: e.target.value })}
                    />
                  </div>

                  <h3>Circulation & Borrow Rules</h3>
                  <div className="form-row margin-bottom-20">
                    <div className="form-group">
                      <label>Borrow Limit Duration (Days)</label>
                      <input
                        type="number"
                        value={settings.maxBorrowDays}
                        onChange={(e) => setSettings({ ...settings, maxBorrowDays: parseInt(e.target.value) || 14 })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Fine Charge ($ Per Day)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={settings.finePerDay}
                        onChange={(e) => setSettings({ ...settings, finePerDay: parseFloat(e.target.value) || 1.5 })}
                      />
                    </div>
                  </div>

                  <h3>Appearance Themes</h3>
                  <div className="theme-options margin-bottom-32">
                    <button
                      type="button"
                      className={`theme-btn btn-cedar ${settings.theme === 'cedar' ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, theme: 'cedar' })}
                    >
                      Warm Cedar
                    </button>
                    <button
                      type="button"
                      className={`theme-btn btn-teal ${settings.theme === 'teal' ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, theme: 'teal' })}
                    >
                      Library Teal
                    </button>
                    <button
                      type="button"
                      className={`theme-btn btn-crimson ${settings.theme === 'crimson' ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, theme: 'crimson' })}
                    >
                      Crimson Leather
                    </button>
                    <button
                      type="button"
                      className={`theme-btn btn-slate  ${settings.theme === 'slate' ? 'active' : ''}`}
                      onClick={() => setSettings({ ...settings, theme: 'slate' })}
                    >
                      Slate Obsidian
                    </button>
                  </div>

                  <button type="submit" className="save-settings-btn">Save Library Configuration</button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================================= */}
      {/* DIALOG MODAL: ADD/EDIT BOOK */}
      {/* ========================================================================= */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{editBook ? 'Edit Catalog Record' : 'Add New Catalog Record'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input type="text" placeholder="Book title" value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Author *</label>
                  <input type="text" placeholder="Author name" value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input type="number" placeholder="Price" value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>ISBN *</label>
                  <input type="text" placeholder="ISBN number" value={form.isbn}
                    onChange={(e) => setForm({ ...form, isbn: e.target.value })} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Published Date *</label>
                  <input type="date" value={form.publishedDate}
                    onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input type="text" placeholder="Fiction, Self Help..." value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Cover Image URL (Optional - seed fallback covers if blank)</label>
                <input type="text" placeholder="https://..." value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea placeholder="Book synopsis..." value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" />
              </div>
              <button type="submit" className="modal-submit">
                {editBook ? 'Save Changes' : 'Publish Book'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG MODAL: DELETE BOOK CONFIRM */}
      {/* ========================================================================= */}
      {showDeleteConfirm && (
        <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon"><FontAwesomeIcon icon={faTrash} /></div>
            <h3>Delete Catalog Entry?</h3>
            <p>Are you sure you want to delete this book record? This action cannot be undone.</p>
            <div className="delete-btns">
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="confirm-btn" onClick={handleDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG MODAL: ADD MEMBER */}
      {/* ========================================================================= */}
      {showMemberModal && (
        <div className="modal-backdrop" onClick={() => setShowMemberModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Register New Library Card</h2>
              <button className="modal-close" onClick={() => setShowMemberModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="modal-form">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={memberForm.name}
                  onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={memberForm.email}
                  onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="custom-select"
                  value={memberForm.role}
                  onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                </select>
              </div>
              <button type="submit" className="modal-submit">Register Member</button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DIALOG MODAL: ISSUE BOOK */}
      {/* ========================================================================= */}
      {showIssueModal && (
        <div className="modal-backdrop" onClick={() => setShowIssueModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Issue Book Lease Slip</h2>
              <button className="modal-close" onClick={() => setShowIssueModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleIssueBook} className="modal-form">
              <div className="form-group">
                <label>Select Book to Loan *</label>
                <select
                  className="custom-select"
                  value={issueForm.bookId}
                  onChange={(e) => setIssueForm({ ...issueForm, bookId: e.target.value })}
                  required
                >
                  <option value="">-- Select Available Book --</option>
                  {books.filter(b => b.available !== false).map(b => (
                    <option key={b._id} value={b._id}>{b.title} (ISBN: {b.isbn})</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Borrower Library Member *</label>
                <select
                  className="custom-select"
                  value={issueForm.memberId}
                  onChange={(e) => setIssueForm({ ...issueForm, memberId: e.target.value })}
                  required
                >
                  <option value="">-- Select Active Member --</option>
                  {members.filter(m => m.status === 'Active').map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="modal-submit">Issue Lease</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;