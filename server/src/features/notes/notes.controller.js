import { BaseController } from '../../core/base.controller.js';
import noteService from './notes.service.js';

class NoteController extends BaseController {
    constructor() {
        super();
        this.createNote = this.createNote.bind(this);
        this.getAllNotes = this.getAllNotes.bind(this);
        this.getNoteById = this.getNoteById.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
    }

    async createNote(req, res) {
        try {
            const note = await noteService.createNote(req.user.id, req.body);
            this.createdResponse(res, 'Note created successfully', note);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async getAllNotes(req, res) {
        try {
            const notes = await noteService.getAllNotes(req.user.id, req.query);
            this.successResponse(res, 'Notes retrieved successfully', notes);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async getNoteById(req, res) {
        try {
            const note = await noteService.getNoteById(req.user.id, req.params.id);
            this.successResponse(res, 'Note retrieved successfully', note);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async updateNote(req, res) {
        try {
            const note = await noteService.updateNote(req.user.id, req.body);
            this.successResponse(res, 'Note updated successfully', note);
        } catch (error) {
            this.errorResponse(res, error);
        }
    }

    async deleteNote(req, res) {
        try {
            await noteService.deleteNote(req.user.id, req.params.id);
            this.successResponse(res, 'Note deleted successfully');
        } catch (error) {
            this.errorResponse(res, error);
        }
    }
}

export default new NoteController();
