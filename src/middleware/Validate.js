
const validateRegister = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push('Email must be a valid email address');
    }
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(', ') });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const errors = [];
  const { email, password } = req.body;

  if (!email || !email.trim()) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(', ') });
  }

  next();
};


const validateTaskCreate = (req, res, next) => {
  const errors = [];
  const { title, dueDate } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('Title is required');
  }

  if (!dueDate) {
    errors.push('Due date is required');
  } else {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due date must be a valid date (e.g. YYYY-MM-DD)');
    }
  }

  if (req.body.status && !['pending', 'completed'].includes(req.body.status)) {
    errors.push('Status must be either pending or completed');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(', ') });
  }

  next();
};

const validateTaskUpdate = (req, res, next) => {
  const errors = [];
  const { dueDate, status } = req.body;

  if (dueDate) {
    const parsedDate = new Date(dueDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Due date must be a valid date (e.g. YYYY-MM-DD)');
    }
  }

  if (status && !['pending', 'completed'].includes(status)) {
    errors.push('Status must be either pending or completed');
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, message: errors.join(', ') });
  }

  next();
};

module.exports = { validateRegister, validateLogin, validateTaskCreate, validateTaskUpdate };