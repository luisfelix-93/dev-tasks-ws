const Task = require('../model/Tasks')
class TaskUtil {
    async generateTaskCode(taskType) {
        try {
            const baseCode = taskType.slice(0, 3).toUpperCase(); // Pegar os 3 primeiros caracteres do taskType em maiúsculas
            let code;
            let isUnique = false;
            let counter = 1;
    
            // Loop até encontrar um código único ou alcançar um limite máximo
            while (!isUnique && counter <= 999) { // Limitar o contador a 999 para evitar loops infinitos
                // Formatar o contador com três dígitos (por exemplo, 001, 002, ..., 010, 011, ...)
                const formattedCounter = counter.toString().padStart(3, '0');
                code = `${baseCode}${formattedCounter}`;
    
                // Verificar se o código já existe no banco de dados
                const existingTask = await Task.findOne({ taskCode: code });
    
                if (!existingTask) {
                    isUnique = true; // O código é único, pode sair do loop
                } else {
                    counter++; // Incrementar o contador e tentar novamente
                }
            }
    
            if (!isUnique) {
                throw new Error('Não foi possível gerar um código único após várias tentativas.');
            }
    
            return code;
        } catch (error) {
            throw new Error(`Erro ao gerar código da tarefa: ${error.message}`);
        }
    }
}

module.exports = new TaskUtil();