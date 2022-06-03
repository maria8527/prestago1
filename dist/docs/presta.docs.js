/**
 *
 * @swagger
 * /mongo:
 *  get:
 *      summary: Bring all users not registered. Esto es en la base de datos de mongo
 *      tags: [users_not_registered]
 *      responses:
 *          200:
 *              description: Brought all the users not registered in the application
 *          500:
 *              description: Internal server error
 *
 */
/**
 *
 * @swagger
 * /mongo:
 *  post:
 *      summary: Creates a new user no registered in the application
 *      tags: [Metod post the users no registered in mongo]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *      responses:
 *          201:
 *              description: Successfully created a new user no registered
 *          500:
 *              description: Failed to create a new user no registered
 *          400:
 *              description: Bad request
 *
 */
/**
 *
 * @swagger
 * /mongo/:id:
 *  put:
 *      summary: Edit the user no registered
 *      tags: [update the user no registered]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the user no registered
 *      requestBody:
 *          required: true
 *      responses:
 *          200:
 *              description: Successfully updated user no registered
 *          304:
 *              description: User no registered with id not updated
 *          400:
 *              description: Bad request
 *
 */
/**
 * @swagger
 * /mongo/:id:
 *  delete:
 *      summary: Delete a user no registered
 *      tags: [delete the user no registered]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: idenfication of the user no registered
 *      responses:
 *          202:
 *              description: Successfully removed user no registered
 *          400:
 *              description: Failed to remove user no registered
 *          404:
 *              description: User no registered with id does not exist
 */
/**
 *
 * @swagger
 * /api/presta:
 *  get:
 *      summary: Bring all the users registered in the database
 *      tags: [register]
 *      responses:
 *          200:
 *              description: Brought all the users not registered in the database
 *          500:
 *              description: Internal server error
 *
 *
 *
 *
 */ 
//# sourceMappingURL=presta.docs.js.map