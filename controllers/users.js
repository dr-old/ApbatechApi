const joi = require("joi");
const User = require("../models/users");
const helper = require("../utils/helper");
const fs = require("fs");
const uuid = require("uuid");

const UserController = {
  async create(request, response) {
    const schema = joi.object({
      userId: joi.string().required(),
      username: joi.string().required(),
      password: joi.string().min(6).max(30).required(),
      fullname: joi.string().required(),
      privileges: joi.string().required(),
      clinicId: joi.string().required(),
      branchId: joi.string().required(),
    });
    const payload = {
      userId: uuid.v4(),
      username: request.body.username,
      password: request.body.password,
      fullname: request.body.fullname,
      privileges: request.body.privileges,
      clinicId: request.body.clinicId,
      branchId: request.body.branchId,
    };

    schema
      .validateAsync(payload, { abortEarly: false })
      .then(async (res) => {
        const result = await User.findOne({
          where: { username: request.body.username },
        });
        if (result?.username) {
          return helper.response(response, 400, "Username already exist");
        } else {
          await User.create(payload)
            .then((data) => {
              return helper.response(
                response,
                200,
                "Create user success",
                data
              );
            })
            .catch((e) => {
              return helper.response(response, 400, "Create user failed", e);
            });
        }
      })
      .catch((e) => {
        return helper.response(response, 400, "Create user failed", e);
      });
  },

  async update(request, response) {
    const { id } = request.params;
    const schema = joi.object({
      username: joi.string().required(),
      password: joi.string().min(6).max(30).required(),
      fullname: joi.string().required(),
      privileges: joi.string().required(),
      clinicId: joi.string().required(),
      branchId: joi.string().required(),
    });
    const payload = {
      username: request.body.username,
      password: request.body.password,
      fullname: request.body.fullname,
      privileges: request.body.privileges,
      clinicId: request.body.clinicId,
      branchId: request.body.branchId,
    };

    schema
      .validateAsync(payload, { abortEarly: false })
      .then(async (_) => {
        const result = await User.findOne({
          where: { userId: id },
        });
        if (result !== null) {
          await User.update(request.body, {
            where: { userId: id },
          })
            .then(async (data) => {
              const newData = await User.findOne({
                where: { userId: id },
              });
              return helper.response(
                response,
                200,
                "Update user success",
                newData
              );
            })
            .catch((e) => {
              return helper.response(response, 400, "Update user failed", e);
            });
        } else {
          return helper.response(response, 400, "User is not found");
        }
      })
      .catch((e) => {
        return helper.response(response, 400, "Update user failed", e);
      });
  },

  async getAll(_, response) {
    await User.findAll()
      .then(async (data) => {
        return helper.response(response, 200, "Get user success", data);
      })
      .catch((e) => {
        return helper.response(response, 400, "User is not found", e);
      });
  },

  async getById(request, response) {
    const { id } = request.params;
    const data = await User.findOne({
      where: { userId: id },
    });
    if (data === null) {
      return helper.response(response, 400, "User is not found");
    } else {
      return helper.response(response, 200, "Get user success", data);
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const exist = await User.findOne({
      where: { userId: id },
    });
    if (exist === null) {
      return helper.response(response, 400, "User is not found");
    } else {
      await User.destroy({
        where: { userId: id },
      })
        .then((_) => {
          return helper.response(response, 200, "Delete user success");
        })
        .catch((e) => {
          return helper.response(response, 400, "Delete user failed", e);
        });
    }
  },
};

module.exports = UserController;
