import usersData from '../data/users.json';
import projectsData from '../data/projects.json';
import documentsData from '../data/documents.json';
import milestonesData from '../data/milestones.json';
import messagesData from '../data/messages.json';

// Initialize localStorage with seed data ONLY if not already set
const initializeData = () => {
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(usersData));
    if (!localStorage.getItem('projects')) localStorage.setItem('projects', JSON.stringify(projectsData));
    if (!localStorage.getItem('documents')) localStorage.setItem('documents', JSON.stringify(documentsData));
    if (!localStorage.getItem('milestones')) localStorage.setItem('milestones', JSON.stringify(milestonesData));
    if (!localStorage.getItem('messages')) localStorage.setItem('messages', JSON.stringify(messagesData));
};

initializeData();

export const dataService = {
    // Get all items in a collection (synchronous from localStorage)
    getAll(collection) {
        const data = localStorage.getItem(collection);
        return data ? JSON.parse(data) : [];
    },

    // Get single item by id
    getById(collection, id) {
        const items = this.getAll(collection);
        return items.find(item => item.id === id) || null;
    },

    // Create a new item
    create(collection, item) {
        const items = this.getAll(collection);
        const newItem = { ...item, id: 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5) };
        items.push(newItem);
        localStorage.setItem(collection, JSON.stringify(items));
        return newItem;
    },

    // Update an item by id
    update(collection, id, updates) {
        const items = this.getAll(collection);
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updates };
            localStorage.setItem(collection, JSON.stringify(items));
            return items[index];
        }
        return null;
    },

    // Delete an item by id
    remove(collection, id) {
        let items = this.getAll(collection);
        items = items.filter(item => item.id !== id);
        localStorage.setItem(collection, JSON.stringify(items));
        return true;
    },

    // Get projects where user is a member
    getProjectsForUser(userId) {
        const projects = this.getAll('projects');
        return projects.filter(p => p.members && p.members.includes(userId));
    },

    // Get messages for a project, sorted by time
    getMessagesForProject(projectId) {
        const messages = this.getAll('messages');
        return messages
            .filter(m => m.projectId === projectId)
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    },

    // Authenticate user by email and password
    authenticate(email, password) {
        const users = this.getAll('users');
        return users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password) || null;
    },

    // Reset all data back to seed (useful for dev)
    resetAll() {
        localStorage.setItem('users', JSON.stringify(usersData));
        localStorage.setItem('projects', JSON.stringify(projectsData));
        localStorage.setItem('documents', JSON.stringify(documentsData));
        localStorage.setItem('milestones', JSON.stringify(milestonesData));
        localStorage.setItem('messages', JSON.stringify(messagesData));
    }
};
