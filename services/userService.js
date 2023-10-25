const { UserRepository } = require('../repository');
const { logger, BadRequestError } = require('../utils');
const { buildMetadataDTO, buildUserListResponseDTO } = require('../models/dto')

class UserService {
    static async getUserList(req) {
        try {
            const paginationFilter = req.toPaginationModel()
            const result = await UserRepository.getUser(paginationFilter);
            return {
                data: buildUserListResponseDTO(result),
                metadata: buildMetadataDTO(req.page, req.pageSize, result[0].count)
            }
        } catch (err) {
            throw err;
        }
    }

    static async registerUser(email, gender, password) {
        try {
            if (!email || !password || !gender) {
                logger.error("[UserService - registerUser] Email, password, and gender fields are required");
                throw new BadRequestError('Email, password, and gender fields are required');
            }
            return await UserRepository.registerUser(email, gender, password);
        } catch (err) {
            throw err;
        }
    }

    static async loginUser(email, password) {
        try {
            if (!email || !password) {
                logger.error("[UserService - loginUser] Email and password fields are required");
                throw new BadRequestError("Email and password fields are required")
            }
            return await UserRepository.loginUser(email, password);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = UserService;