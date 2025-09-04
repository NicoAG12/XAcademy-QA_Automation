
describe("Registro en XAcademy", () => {
    const combinaciones = [{nombre: "Javier", apellido: "Fernandez", telefono: "3815683551", dni: "43234153", provincia: "Buenos Aires", localidad: "La Plata",mes_nacimiento : 'enero',anio_nacimiento: '1990',dia_nacimiento: '15',
        mail: "emailPrueba@gmail.com",password:"Password12345"
    }, 
        {nombre: "Ana", apellido: "Gomez", telefono: "3815683552", dni: "43234154", provincia: "Catamarca", localidad: "Amadores",mes_nacimiento : 'febrero',anio_nacimiento: '1985',dia_nacimiento : '1',
        mail: "emailPrueba2@gmail.com",password:"PassSS1243$$"
        },
         {nombre: "Luis", apellido: "Martinez", telefono: "3815683553", dni: "43234155", provincia: "Buenos Aires", localidad: "Bahia Blanca",mes_nacimiento : 'marzo',anio_nacimiento: '2000',dia_nacimiento : '23',
        mail: "emailPrueba3@gmail.com",password:"Pa$$Sx.Word-_ 214"
         },];
    

    it("Registro exitoso", () => {
        combinaciones.forEach((data)=>{
            cy.visit("https://ticketazo.com.ar/auth/registerUser");
            cy.get('[data-cy="input-nombres"]').type(data.nombre)
            cy.get('[data-cy="input-apellido"]').type(data.apellido)
            cy.get('[data-cy="input-telefono"]').type(data.telefono)
            cy.get('[data-cy="input-dni"]').type(data.dni)
            cy.get('[data-cy="select-provincia"]').type(`${data.provincia}{enter}`)
            cy.get('[data-cy="select-localidad"]').type(`${data.localidad}{enter}`)
              cy.get('[data-slot="selector-button"]').click().then(()=>{
        cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="picker-month-list"]').then((meses)=>{
                cy.wrap(meses).contains(data.mes_nacimiento).click();
                cy.wait(500)
                ;
            }).then(()=>{
              cy.get('[data-slot="picker-year-list"]').then((años)=>{
                cy.wrap(años).contains(data.anio_nacimiento).click();
                cy.wait(500)
              });  
            })
        cy.get('[data-slot="header"]').click().then(()=>{
            cy.get('[data-slot="grid-body"] tr').each((fila)=>{
                cy.wrap(fila).find('td').each((celda) => {
                    const disabled = celda.attr("aria-disabled") === "true";
                    if(celda.text().trim() === data.dia_nacimiento && !disabled){
                        cy.wrap(celda).click();
                    }
                });
            })
        });
        })
     })

     cy.get('[data-cy="input-email"]').type(data.mail)
     cy.get('[data-cy="input-confirmar-email"]').type(data.mail)
     cy.get('[data-cy="input-password"]').type(data.password)
     cy.get('[data-cy="input-repetir-password"]').type(data.password)
     cy.wait(500)
     cy.get('[data-cy="btn-registrarse"]').click()
     cy.wait(2000)
        })
    });
    
});
