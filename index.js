document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.info-form');
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      validateField(this);
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && !value) {
      isValid = false;
      showError(field, '此字段为必填项');
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = emailRegex.test(value);
      if (!isValid) showError(field, '请输入有效的邮箱地址');
    } else if (field.id === 'phone' && value) {
      const phoneRegex = /^[0-9]{11}$/;
      isValid = phoneRegex.test(value);
      if (!isValid) showError(field, '请输入11位手机号码');
    } else if (field.id === 'idcard' && value) {
      const idcardRegex = /^[0-9]{17}[0-9X]$/;
      isValid = idcardRegex.test(value);
      if (!isValid) showError(field, '请输入正确的18位身份证号');
    }

    if (isValid) {
      clearError(field);
    }

    return isValid;
  }

  function showError(field, message) {
    clearError(field);
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    field.parentElement.appendChild(error);
    field.style.borderColor = '#dc3545';
  }

  function clearError(field) {
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = '#e9ecef';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    let allValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        allValid = false;
      }
    });

    if (allValid) {
      alert('表单验证通过！\n\n感谢您填写个人信息登记表。');
      form.reset();
    } else {
      alert('请检查表单中的错误项！');
    }
  });

  form.addEventListener('reset', function() {
    if (confirm('确定要重置所有表单内容吗？')) {
      const errors = form.querySelectorAll('.error-message');
      errors.forEach(error => error.remove());
      const inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(input => {
        input.style.borderColor = '#e9ecef';
      });
    }
  });

  const skillTags = document.querySelectorAll('.skill-tag input');
  skillTags.forEach(tag => {
    tag.addEventListener('change', function() {
      const label = this.parentElement;
      if (this.checked) {
        label.style.background = '#4a90e2';
        label.style.color = 'white';
        label.style.borderColor = '#4a90e2';
      } else {
        label.style.background = 'white';
        label.style.color = '#495057';
        label.style.borderColor = '#e9ecef';
      }
    });
  });

  const hobbyTags = document.querySelectorAll('.hobby-tag input');
  hobbyTags.forEach(tag => {
    tag.addEventListener('change', function() {
      const label = this.parentElement;
      if (this.checked) {
        label.style.background = '#4a90e2';
        label.style.color = 'white';
        label.style.borderColor = '#4a90e2';
      } else {
        label.style.background = 'white';
        label.style.color = '#495057';
        label.style.borderColor = '#e9ecef';
      }
    });
  });

  const photoInput = document.getElementById('photo');
  photoInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('请上传JPG、PNG格式的图片！');
        this.value = '';
      } else if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB！');
        this.value = '';
      }
    }
  });
});