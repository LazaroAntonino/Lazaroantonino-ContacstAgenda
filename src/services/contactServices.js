const contactServices = {}
    contactServices.getAgendas =  async () => {
        try {
            const resp = await fetch('https://playground.4geeks.com/contact/agendas');
            const data = await resp.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    contactServices.getOneAgenda =  async (slug) => {
        try {
            const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
            const data = await resp.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    contactServices.deleteAgenda = async (slug) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el contacto');
            }
        } catch (err) {
            console.error('Estoy en el CATCH Error en el proceso:', err.message || err);
        }
    }

export default contactServices;