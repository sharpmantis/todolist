// Récupérer l'instance de connexion à la base de données
var db = require('../dbconnection');

/**
 * @name Todo Classe modèle pour la gestion des todos
 */
var Todo = {
    /**
     * Retourne un todo à partir de son id
     * @param {*} id 
     * @param {*} callback 
     */
    getTodoById(id, callback) {
        return db.query(
           "SELECT id, title FROM todos WHERE id=?",
           [id],
           callback
        );
    },

    /**
     * @name getAllTodos(void): query
     * Exécute une requête pour récupérer la totalité des todos
     */
    getAllTodos: function(callback) {
        return db.query("SELECT * FROM todos", callback);
    },

    /**
     * Retourne le dernier todo créé
     */
    getLastTodo: function(callback) {
        return db.query(
            "SELECT * FROM todos ORDER BY id DESC LIMIT 0,1;",
            callback
        )
    },
    
    /**
     * @name addTodo(Todo, callback)
     * Ajoute un todo dans la table concernée
     */
    addTodo: function(Todo, callback) {
        console.log('Add ' + JSON.stringify(Todo));
        return db.query(
            "INSERT INTO todos (title) VALUES (?);",
            [Todo.title, Todo.debut, Todo.fin],
            callback
        );
    },

    /**
     * @name updateTodo(int id, Todo Todo)
     * @param {int} id 
     * @param {Todo} Todo 
     * @param {*} callback 
     */
    updateTodo(id, Todo, callback) {
        return db.query(
            "UPDATE todos SET title=? WHERE id=?;",
            [Todo.title, id],
            callback
        )
    },

    /**
     * @name deleteTodo(int id, callback)
     * @param {*} id 
     * @param {*} callback 
     */
    deleteTodo(id, callback) {
        return db.query(
            "DELETE FROM todos WHERE id=?;",
            [id],
            callback
        );
    }
};

// Exposer la classe en l'exportant
module.exports = Todo;