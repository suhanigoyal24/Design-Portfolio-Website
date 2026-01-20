
        // ===== Authentication Logic =====
        const authContainer = document.getElementById('authContainer');
        const dashboard = document.getElementById('dashboard');
        const loginCard = document.getElementById('loginCard');
        const signupCard = document.getElementById('signupCard');
        const showSignup = document.getElementById('showSignup');
        const showLogin = document.getElementById('showLogin');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const logoutBtn = document.getElementById('logoutBtn');

        // Toggle between login/signup
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginCard.classList.add('hidden');
            signupCard.classList.remove('hidden');
        });

        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        });

        // Login functionality
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Show loading state
            const btnText = loginForm.querySelector('.btn-text');
            const spinner = loginForm.querySelector('.spinner');
            btnText.textContent = 'Signing in...';
            spinner.style.display = 'block';
            
            // Simulate login (replace with actual auth)
            setTimeout(() => {
                authContainer.style.display = 'none';
                dashboard.style.display = 'flex';
                
                // Set the user's name from email (first part before @)
                const userName = email.split('@')[0];
                document.getElementById('profileName').textContent = userName;
                document.getElementById('fullName').value = userName;
                
                // Load portfolio data
                loadPortfolioData();
                
                // Reset form
                btnText.textContent = 'Sign In';
                spinner.style.display = 'none';
            }, 1500);
        });

        // Signup functionality
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Show loading state
            const btnText = signupForm.querySelector('.btn-text');
            const spinner = signupForm.querySelector('.spinner');
            btnText.textContent = 'Creating account...';
            spinner.style.display = 'block';
            
            // Simulate signup (replace with actual auth)
            setTimeout(() => {
                // Set default portfolio data
                portfolioData = {
                    personalInfo: {
                        fullName: name,
                        email: email,
                        profileImage: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMzAiIGZpbGw9IiM2YzVjZTciLz48bGluZSB4MT0iMTAwIiB5MT0iMTAwIiB4Mj0iMTAwIiB5Mj0iMTUwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjxsaW5lIHgxPSIxMDAiIHkxPSIxMjAiIHgyPSI2MCIgeTI9IjE0MCIgc3Ryb2tlPSIjNmM1Y2U3IiBzdHJva2Utd2lkdGg9IjUiLz48bGluZSB4MT0iMTAwIiB5MT0iMTIwIiB4Mj0iMTQwIiB5Mj0iMTQwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjxsaW5lIHgxPSIxMDAiIHkxPSIxNTAiIHgyPSI3MCIgeTI9IjE4MCIgc3Ryb2tlPSIjNmM1Y2U3IiBzdHJva2Utd2lkdGg9IjUiLz48bGluZSB4MT0iMTAwIiB5MT0iMTUwIiB4Mj0iMTMwIiB5Mj0iMTgwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg=='
                    },
                    skills: [],
                    experience: [{
                        title: '',
                        company: '',
                        start: '',
                        end: '',
                        description: ''
                    }],
                    template: 'minimal'
                };
                
                // Show dashboard
                authContainer.style.display = 'none';
                dashboard.style.display = 'flex';
                
                // Set profile name
                document.getElementById('profileName').textContent = name;
                
                // Load portfolio data
                loadPortfolioData();
                
                // Reset form
                btnText.textContent = 'Create Account';
                spinner.style.display = 'none';
                
                // Show guide for new users
                document.getElementById('guideSteps').style.display = 'block';
            }, 1500);
        });

        // Logout functionality
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                dashboard.style.display = 'none';
                authContainer.style.display = 'flex';
                loginCard.classList.remove('hidden');
                signupCard.classList.add('hidden');
            }
        });

        // ===== Portfolio Editor Logic =====
        // DOM Elements
        const profileUpload = document.getElementById('profileUpload');
        const profileImage = document.getElementById('profileImage');
        const fullName = document.getElementById('fullName');
        const jobTitle = document.getElementById('jobTitle');
        const emailInput = document.getElementById('email');
        const phone = document.getElementById('phone');
        const bio = document.getElementById('bio');
        const skillInput = document.getElementById('skillInput');
        const addSkillBtn = document.getElementById('addSkillBtn');
        const skillsList = document.getElementById('skillsList');
        const addExperienceBtn = document.getElementById('addExperienceBtn');
        const experienceContainer = document.getElementById('experienceContainer');
        const templatePreview = document.getElementById('templatePreview');
        const savePortfolioBtn = document.getElementById('savePortfolioBtn');
        const changeTemplateBtn = document.getElementById('changeTemplateBtn');

        // Portfolio Data
        let portfolioData = {
            personalInfo: {},
            skills: [],
            experience: [],
            template: 'minimal'
        };

        // Load saved data from localStorage
        function loadPortfolioData() {
            const savedData = localStorage.getItem('portfolioData');
            if (savedData) {
                portfolioData = JSON.parse(savedData);
                
                // Populate personal info
                if (portfolioData.personalInfo) {
                    const { fullName: name, jobTitle: title, email, phone: phoneNum, bio: bioText, profileImage: img } = portfolioData.personalInfo;
                    if (name) fullName.value = name;
                    if (title) jobTitle.value = title;
                    if (email) emailInput.value = email;
                    if (phoneNum) phone.value = phoneNum;
                    if (bioText) bio.value = bioText;
                    if (img) profileImage.src = img;
                    
                    // Update profile name in sidebar
                    document.getElementById('profileName').textContent = name;
                    document.getElementById('profileTitle').textContent = title || 'Your Profession';
                }
                
                // Populate skills
                if (portfolioData.skills && portfolioData.skills.length > 0) {
                    renderSkills();
                }
                
                // Populate experience
                if (portfolioData.experience && portfolioData.experience.length > 0) {
                    renderExperiences();
                }
                
                updatePreview();
            } else {
                // Initialize with empty experience
                portfolioData.experience.push({
                    title: '',
                    company: '',
                    start: '',
                    end: '',
                    description: ''
                });
                renderExperiences();
            }
        }

        // Profile Image Upload
        profileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profileImage.src = event.target.result;
                    portfolioData.personalInfo.profileImage = event.target.result;
                    savePortfolio();
                    updatePreview();
                };
                reader.readAsDataURL(file);
            }
        });

        // Auto-save personal info
        [fullName, jobTitle, emailInput, phone, bio].forEach(input => {
            input.addEventListener('input', function() {
                portfolioData.personalInfo = {
                    fullName: fullName.value,
                    jobTitle: jobTitle.value,
                    email: emailInput.value,
                    phone: phone.value,
                    bio: bio.value,
                    profileImage: profileImage.src
                };
                
                // Update profile name in sidebar
                document.getElementById('profileName').textContent = fullName.value || 'Your Name';
                document.getElementById('profileTitle').textContent = jobTitle.value || 'Your Profession';
                
                savePortfolio();
                updatePreview();
            });
        });

        // Skills Management
        addSkillBtn.addEventListener('click', addSkill);
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addSkill();
        });

        function addSkill() {
            const skill = skillInput.value.trim();
            if (skill && !portfolioData.skills.includes(skill)) {
                portfolioData.skills.push(skill);
                skillInput.value = '';
                renderSkills();
                savePortfolio();
                updatePreview();
            }
        }

        function renderSkills() {
            skillsList.innerHTML = portfolioData.skills.map(skill => `
                <div class="skill-tag">
                    ${skill}
                    <button class="remove-skill" data-skill="${skill}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');

            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-skill').forEach(btn => {
                btn.addEventListener('click', function() {
                    const skillToRemove = this.dataset.skill;
                    portfolioData.skills = portfolioData.skills.filter(s => s !== skillToRemove);
                    renderSkills();
                    savePortfolio();
                    updatePreview();
                });
            });
        }

        // Experience Management
        addExperienceBtn.addEventListener('click', function() {
            portfolioData.experience.push({
                title: '',
                company: '',
                start: '',
                end: '',
                description: ''
            });
            renderExperiences();
        });

        function renderExperiences() {
            experienceContainer.innerHTML = portfolioData.experience.map((exp, index) => `
                <div class="experience-item" data-index="${index}">
                    <div class="form-grid">
                        <div class="form-group">
                            <label>Job Title</label>
                            <input type="text" class="exp-title" value="${exp.title || ''}" placeholder="Frontend Developer">
                        </div>
                        <div class="form-group">
                            <label>Company</label>
                            <input type="text" class="exp-company" value="${exp.company || ''}" placeholder="Tech Corp">
                        </div>
                        <div class="form-group">
                            <label>Start Date</label>
                            <input type="month" class="exp-start" value="${exp.start || ''}">
                        </div>
                        <div class="form-group">
                            <label>End Date</label>
                            <input type="month" class="exp-end" value="${exp.end || ''}">
                        </div>
                        <div class="form-group full-width">
                            <label>Description</label>
                            <textarea rows="3" class="exp-desc" placeholder="Job responsibilities...">${exp.description || ''}</textarea>
                        </div>
                    </div>
                    <button class="remove-experience">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('');

            // Add event listeners to experience inputs
            document.querySelectorAll('.experience-item').forEach(item => {
                const index = item.dataset.index;
                
                item.querySelector('.exp-title').addEventListener('input', function() {
                    portfolioData.experience[index].title = this.value;
                    savePortfolio();
                    updatePreview();
                });
                
                item.querySelector('.exp-company').addEventListener('input', function() {
                    portfolioData.experience[index].company = this.value;
                    savePortfolio();
                    updatePreview();
                });
                
                item.querySelector('.exp-start').addEventListener('input', function() {
                    portfolioData.experience[index].start = this.value;
                    savePortfolio();
                    updatePreview();
                });
                
                item.querySelector('.exp-end').addEventListener('input', function() {
                    portfolioData.experience[index].end = this.value;
                    savePortfolio();
                    updatePreview();
                });
                
                item.querySelector('.exp-desc').addEventListener('input', function() {
                    portfolioData.experience[index].description = this.value;
                    savePortfolio();
                    updatePreview();
                });
                
                item.querySelector('.remove-experience').addEventListener('click', function() {
                    portfolioData.experience.splice(index, 1);
                    renderExperiences();
                    savePortfolio();
                    updatePreview();
                });
            });
        }

        // Save Portfolio
        function savePortfolio() {
            localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
        }

        savePortfolioBtn.addEventListener('click', function() {
            savePortfolio();
            alert('Portfolio saved successfully!');
        });

        // Template Preview
        function updatePreview() {
            const { personalInfo, skills, experience, template } = portfolioData;
            
            // Different preview styles based on selected template
            let previewStyles = {
                minimal: {
                    primaryColor: 'var(--primary)',
                    secondaryColor: 'var(--primary-light)',
                    textColor: 'var(--dark)'
                },
                professional: {
                    primaryColor: 'var(--success)',
                    secondaryColor: '#00a884',
                    textColor: 'var(--dark)'
                },
                creative: {
                    primaryColor: 'var(--secondary)',
                    secondaryColor: '#e84393',
                    textColor: 'var(--dark)'
                },
                modern: {
                    primaryColor: 'var(--warning)',
                    secondaryColor: '#e17055',
                    textColor: 'var(--dark)'
                }
            };
            
            const style = previewStyles[template] || previewStyles.minimal;
            
            templatePreview.innerHTML = `
                <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: 'Poppins', sans-serif;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <img src="${personalInfo.profileImage || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3MCIgcj0iMzAiIGZpbGw9IiM2YzVjZTciLz48bGluZSB4MT0iMTAwIiB5MT0iMTAwIiB4Mj0iMTAwIiB5Mj0iMTUwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjxsaW5lIHgxPSIxMDAiIHkxPSIxMjAiIHgyPSI2MCIgeTI9IjE0MCIgc3Ryb2tlPSIjNmM1Y2U3IiBzdHJva2Utd2lkdGg9IjUiLz48bGluZSB4MT0iMTAwIiB5MT0iMTIwIiB4Mj0iMTQwIiB5Mj0iMTQwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjxsaW5lIHgxPSIxMDAiIHkxPSIxNTAiIHgyPSI3MCIgeTI9IjE4MCIgc3Ryb2tlPSIjNmM1Y2U3IiBzdHJva2Utd2lkdGg9IjUiLz48bGluZSB4MT0iMTAwIiB5MT0iMTUwIiB4Mj0iMTMwIiB5Mj0iMTgwIiBzdHJva2U9IiM2YzVjZTciIHN0cm9rZS13aWR0aD0iNSIvPjwvc3ZnPg=='}" 
                         style="width: 150px; height: 150px; border-radius: 50%; object-fit: cover; border: 3px solid ${style.primaryColor};">
                        <h1 style="margin: 15px 0 5px; color: ${style.primaryColor};">${personalInfo.fullName || 'Your Name'}</h1>
                        <h2 style="margin-bottom: 15px; color: ${style.textColor};">${personalInfo.jobTitle || 'Your Profession'}</h2>
                        <p style="margin-bottom: 10px; color: ${style.textColor};">${personalInfo.email || 'your@email.com'}</p>
                        <p style="color: ${style.textColor};">${personalInfo.phone || '+1 234 567 890'}</p>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <h2 style="border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px; margin-bottom: 15px; color: ${style.textColor};">About Me</h2>
                        <p style="line-height: 1.6; color: ${style.textColor};">${personalInfo.bio || 'Tell about yourself...'}</p>
                    </div>
                    
                    ${skills.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px; margin-bottom: 15px; color: ${style.textColor};">Skills</h2>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                            ${skills.map(skill => `
                                <span style="background: ${style.primaryColor}; color: white; padding: 5px 15px; border-radius: 20px;">${skill}</span>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${experience.length > 0 ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="border-bottom: 2px solid ${style.primaryColor}; padding-bottom: 5px; margin-bottom: 15px; color: ${style.textColor};">Experience</h2>
                        ${experience.map(exp => `
                            <div style="margin-bottom: 20px;">
                                <h3 style="margin-bottom: 5px; color: ${style.textColor};">${exp.title || 'Job Title'} at ${exp.company || 'Company'}</h3>
                                <p style="color: var(--gray); margin-bottom: 10px;">
                                    ${exp.start || 'Start'} - ${exp.end || 'Present'}
                                </p>
                                <p style="line-height: 1.6; color: ${style.textColor};">${exp.description || 'Job description...'}</p>
                            </div>
                        `).join('')}
                    </div>
                    ` : ''}
                </div>
            `;
        }

        // Change Template
        changeTemplateBtn.addEventListener('click', function() {
            document.querySelector('.nav-item[data-section="templates"]').click();
        });

        // ===== Templates Section Logic =====
        document.querySelectorAll('.select-template-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const templateCard = this.closest('.template-card');
                const templateName = templateCard.dataset.template;
                
                portfolioData.template = templateName;
                savePortfolio();
                updatePreview();
                
                // Show success message
                alert(`"${templateCard.querySelector('h3').textContent}" template selected!`);
                
                // Go back to editor
                document.querySelector('.nav-item[data-section="editor"]').click();
            });
        });

        // ===== Onboarding Guide Logic =====
        const startGuideBtn = document.getElementById('startGuideBtn');
        const guideSteps = document.getElementById('guideSteps');
        const stepIndicator = document.getElementById('stepIndicator');
        const prevStepBtn = document.getElementById('prevStepBtn');
        const nextStepBtn = document.getElementById('nextStepBtn');
        const backToEditorBtn = document.getElementById('backToEditorBtn');
        const editorSection = document.getElementById('editorSection');
        const guideSection = document.getElementById('guideSection');
        const templatesSection = document.getElementById('templatesSection');

        // Navigation between sections
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.dataset.section;
                
                // Update active nav item
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding section
                editorSection.classList.add('hidden');
                guideSection.classList.add('hidden');
                templatesSection.classList.add('hidden');
                
                if (section === 'editor') {
                    editorSection.classList.remove('hidden');
                } else if (section === 'guide') {
                    guideSection.classList.remove('hidden');
                } else if (section === 'templates') {
                    templatesSection.classList.remove('hidden');
                }
            });
        });

        // Start guide
        startGuideBtn.addEventListener('click', function() {
            guideSteps.style.display = 'block';
            this.style.display = 'none';
        });

        // Guide navigation
        let currentStep = 1;
        const totalSteps = 4;

        function updateStepNavigation() {
            // Update step indicator
            document.querySelectorAll('.step-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index + 1 === currentStep);
            });
            
            // Update buttons
            prevStepBtn.disabled = currentStep === 1;
            nextStepBtn.textContent = currentStep === totalSteps ? 'Finish' : 'Next';
            
            // Show/hide steps
            document.querySelectorAll('.guide-step').forEach(step => {
                step.classList.toggle('active', parseInt(step.dataset.step) === currentStep);
            });
        }

        prevStepBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepNavigation();
            }
        });

        nextStepBtn.addEventListener('click', function() {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepNavigation();
            } else {
                guideSteps.style.display = 'none';
                startGuideBtn.style.display = 'block';
                currentStep = 1;
                updateStepNavigation();
            }
        });

        // Step indicator clicks
        document.querySelectorAll('.step-dot').forEach(dot => {
            dot.addEventListener('click', function() {
                currentStep = parseInt(this.dataset.step);
                updateStepNavigation();
            });
        });

        // Back to editor from full guide
        backToEditorBtn.addEventListener('click', function() {
            document.querySelector('.nav-item[data-section="editor"]').click();
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize step navigation
            updateStepNavigation();
            
            // For demo purposes, show the auth container by default
            authContainer.style.display = 'flex';
            dashboard.style.display = 'none';
            
            // If you want to skip auth for testing, uncomment this:
            // authContainer.style.display = 'none';
            // dashboard.style.display = 'flex';
            // loadPortfolioData();
        });
    