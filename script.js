/**
 * ISEA - INSTITUTO SUPERIOR DE EXCELENCIA ACADÉMICA
 * Script Maestro Unificado (Versión Final Optimizada)
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       BLOQUE 1: NAVEGACIÓN Y EFECTOS DE SCROLL
       ========================================== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        // Efecto Sticky y cambio de apariencia
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.padding = "10px 0";
            navbar.style.boxShadow = "0 10px 30px rgba(5, 20, 38, 0.1)";
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.padding = "25px 0";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
        }
    });

    // Smooth Scroll profesional para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================
       BLOQUE 2: ANIMACIONES DE REVELADO (AOS)
       ========================================== */
    const revealElements = document.querySelectorAll('.level-card, .program-item, .pillar-item, .faculty-card');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    // Configuración de estado inicial para los elementos a revelar
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Disparo inicial para elementos visibles al cargar

    /* ==========================================
       BLOQUE 3: LÓGICA DE ACORDEÓN (FAQ)
       ========================================== */
    const faqHeaders = document.querySelectorAll('.accordion-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');
            
            // Cerrar todos los demás para un efecto limpio
            document.querySelectorAll('.accordion-item').forEach(other => {
                other.classList.remove('active');
            });

            // Si no estaba abierto, lo abrimos
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    /* ==========================================
       BLOQUE 4: FORMULARIO DE ADMISIONES
       ========================================== */
    const admissionForm = document.querySelector('.main-form');

    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Feedback visual de procesamiento
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Procesando Solicitud...';
            submitBtn.style.opacity = "0.7";

            // Simulación de envío de datos
            const formData = new FormData(this);
            console.log("Datos capturados:", Object.fromEntries(formData));

            setTimeout(() => {
                // Verificamos si existe SweetAlert2, si no, usamos alert estándar
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: '¡Solicitud Recibida!',
                        text: 'El departamento de Admisiones revisará sus datos y se contactará en las próximas 24 horas.',
                        icon: 'success',
                        confirmButtonColor: '#d4af37'
                    });
                } else {
                    alert("¡Solicitud Recibida! El departamento de Admisiones se contactará en las próximas 24 horas.");
                }

                // Reset del formulario y botón
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = "1";
            }, 2000);
        });
    }

    /* ==========================================
       BLOQUE 5: INTERACCIÓN DE GALERÍA
       ========================================== */
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');
        if (overlay) {
            item.addEventListener('mouseenter', () => overlay.style.opacity = "1");
            item.addEventListener('mouseleave', () => overlay.style.opacity = "0");
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.gallery-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // Función para obtener el ancho del primer elemento (incluyendo márgenes)
  const getStepWidth = () => {
    const item = document.querySelector('.gallery-item');
    return item.offsetWidth + parseInt(window.getComputedStyle(item).marginRight || 0);
  };

  // Evento para el botón "Siguiente"
  nextBtn.addEventListener('click', () => {
    track.scrollBy({
      left: getStepWidth(),
      behavior: 'smooth'
    });
  });

  // Evento para el botón "Anterior"
  prevBtn.addEventListener('click', () => {
    track.scrollBy({
      left: -getStepWidth(),
      behavior: 'smooth'
    });
  });

  // Mejora: Control con teclado (flechas)
  document.querySelector('.gallery-viewport').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
});



document.addEventListener('DOMContentLoaded', () => {
    const accessBtn = document.getElementById('btn-access');
    const msgPanel = document.getElementById('analyzer-message');

    function getAdvancedSpecs() {
        const ua = navigator.userAgent;
        let browser = "Desconocido";
        let os = "OS No Identificado";

        // Detección de OS Real
        if (ua.indexOf("Win") != -1) os = "Windows Workstation";
        if (ua.indexOf("Mac") != -1) os = "macOS Apple Desktop";
        if (ua.indexOf("Linux") != -1) os = "Linux System";
        if (ua.indexOf("Android") != -1) os = "Mobile Android";
        if (ua.indexOf("like Mac") != -1) os = "iOS Device";

        // Detección de Navegador Real (Evitando falsos positivos de Chrome)
        if (ua.includes("Edg/")) browser = "Microsoft Edge";
        else if (ua.includes("Chrome") && !ua.includes("Edg/")) browser = "Google Chrome";
        else if (ua.includes("Firefox")) browser = "Mozilla Firefox";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Apple Safari";

        return { 
            w: window.innerWidth, 
            h: window.innerHeight, 
            browser, 
            os 
        };
    }

    // Proceso de escaneo secuencial
    setTimeout(() => {
        const specs = getAdvancedSpecs();
        const isDesktop = specs.w >= 1024;

        // 1. Actualizar Pantalla
        const sScreen = document.getElementById('stat-screen');
        sScreen.querySelector('.value').innerText = `${specs.w} x ${specs.h} px`;
        sScreen.classList.add(isDesktop ? 'valid' : 'invalid');

        // 2. Actualizar Navegador
        setTimeout(() => {
            const sBrowser = document.getElementById('stat-browser');
            sBrowser.querySelector('.value').innerText = specs.browser;
            sBrowser.classList.add('valid');
        }, 800);

        // 3. Actualizar OS
        setTimeout(() => {
            const sOs = document.getElementById('stat-os');
            sOs.querySelector('.value').innerText = specs.os;
            sOs.classList.add('valid');
            
            // Resultado Final
            if (isDesktop) {
                msgPanel.innerHTML = "<span style='color:#2ecc71'>ACCESO GARANTIZADO</span><br> Entorno seguro detectado para OLTSC.";
                accessBtn.innerText = "ENTRAR AL PORTAL";
                accessBtn.classList.add('ready');
                accessBtn.disabled = false;
            } else {
                msgPanel.innerHTML = "<span style='color:#e74c3c'>ACCESO RESTRINGIDO</span><br> Este sistema requiere una estación de trabajo (Desktop).";
                accessBtn.innerText = "DISPOSITIVO NO COMPATIBLE";
            }
        }, 1600);

    }, 1000);

    accessBtn.onclick = () => {
        const overlay = document.getElementById('security-analyzer');
        overlay.style.transition = "all 1s cubic-bezier(0.165, 0.84, 0.44, 1)";
        overlay.style.transform = "scale(1.2)";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 1000);
    };
});


document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.gallery-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    // 1. Lógica del Carrusel
    nextBtn.onclick = () => track.scrollBy({ left: 350, behavior: 'smooth' });
    prevBtn.onclick = () => track.scrollBy({ left: -350, behavior: 'smooth' });

    // 2. Lógica del Modal (Información)
    const modal = document.getElementById('software-modal');
    const infoButtons = document.querySelectorAll('.btn-software-info');
    const closeModal = document.querySelector('.modal-close');

    const softwareData = {
    word: {
        title: "Microsoft Word Professional",
        icon: "fa-file-word",
        desc: "Arquitectura avanzada de documentos complejos. Domine la estandarización institucional mediante estilos jerárquicos, automatización de referencias bibliográficas bajo normas internacionales y gestión de documentos maestros para proyectos de gran escala.",
        skills: ["Ingeniería de Estilos y Plantillas", "Automatización de Referencias (APA/IEEE)", "Control de Cambios y Colaboración", "Diseño Editorial Avanzado"],
        complexity: "70%"
    },
    excel: {
        title: "Microsoft Excel Analytics",
        icon: "fa-file-excel",
        desc: "El motor de inteligencia de negocios definitivo. Transforme datos crudos en decisiones estratégicas mediante modelado financiero avanzado, análisis estadístico, Power Query y la creación de Dashboards dinámicos de alto impacto.",
        skills: ["Modelado Financiero y Estadístico", "Automatización con VBA y Macros", "Business Intelligence con Power Pivot", "Gestión de Grandes Volúmenes de Datos"],
        complexity: "95%"
    },
    powerpoint: {
        title: "Microsoft PowerPoint Executive",
        icon: "fa-file-powerpoint",
        desc: "Narrativa visual y comunicación estratégica. Diseñe experiencias cinemáticas que cautiven audiencias ejecutivas, integrando multimedia avanzada, transiciones de transformación (Morph) e infografías dinámicas de alta precisión.",
        skills: ["Storytelling Corporativo", "Diseño de Patrones Maestros", "Animación Cinemática Avanzada", "Integración Multimedia 4K"],
        complexity: "60%"
    },
    access: {
        title: "Microsoft Access Database",
        icon: "fa-database",
        desc: "Ingeniería de bases de datos relacionales. Estructure sistemas de información robustos, desarrolle interfaces de usuario personalizadas y optimice la integridad de datos mediante consultas SQL y macros de automatización lógica.",
        skills: ["Arquitectura de Datos Relacionales", "Programación de Consultas SQL", "Desarrollo de Formularios e Interfaces", "Automatización de Reportes"],
        complexity: "85%"
    },
    visio: {
        title: "Microsoft Visio Architect",
        icon: "fa-diagram-project",
        desc: "Visualización técnica y diagramación de procesos. Traduzca infraestructuras complejas en mapas visuales precisos, desde diagramas de red de ingeniería hasta modelado de procesos de negocio (BPMN) con vinculación de datos en tiempo real.",
        skills: ["Modelado de Procesos BPMN", "Diagramación de Redes y Sistemas", "Planos Técnicos y Planta", "Vinculación de Datos Externos"],
        complexity: "75%"
    },
    project: {
        title: "Microsoft Project Management",
        icon: "fa-list-check",
        desc: "Control total del ciclo de vida del proyecto. Gestione el triángulo de hierro (tiempo, costo y alcance) mediante la creación de cronogramas críticos, asignación optimizada de recursos y seguimiento de líneas base de alto desempeño.",
        skills: ["Gestión de Ruta Crítica (CPM)", "Optimización de Recursos y Costos", "Análisis de Valor Ganado (EVA)", "Informes de Rendimiento Ejecutivo"],
        complexity: "90%"
    },
    forms: {
        title: "Microsoft Forms & Data",
        icon: "fa-file-lines",
        desc: "Recolección inteligente de datos y análisis de feedback. Implemente encuestas y exámenes con ramificación lógica avanzada, integrando los flujos de respuesta con el ecosistema de Microsoft 365 para una automatización total de resultados.",
        skills: ["Ramificación Lógica Compleja", "Análisis de Resultados en Tiempo Real", "Integración con Power Automate", "Seguridad y Control de Datos"],
        complexity: "50%"
    }
};

    infoButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-software');
            const data = softwareData[key];
            
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerText = data.desc;
            document.getElementById('modal-icon').className = `fa-solid ${data.icon}`;
            
            modal.style.display = 'flex';
        });
    });

    closeModal.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; };
});

document.addEventListener('DOMContentLoaded', () => {
    // LISTA DE CONTROL DE ÁREAS (Ingresa aquí las zonas)
    const municipiosRestringidos = [
    ];

    const areasContainer = document.getElementById('restricted-areas-list');
    const statusBox = document.getElementById('status-cdi');

    if (municipiosRestringidos.length > 0) {
        // Generar lista vertical con iconos
        let listHTML = '<ul class="security-list-vertical">';
        municipiosRestringidos.forEach(area => {
            listHTML += `<li><i class="fa-solid fa-circle-exclamation"></i> ${area}</li>`;
        });
        listHTML += '</ul>';

        areasContainer.innerHTML = listHTML;

        // Estado restringido
        statusBox.className = "status-box status-restricted";
        statusBox.innerHTML = `
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>ZONAS DE RIESGO: <br>Protocolo de entrega en sede central activado.</span>
        `;
    } else {
        areasContainer.innerHTML = "";
        statusBox.className = "status-box status-accepted";
        statusBox.innerHTML = `
            <i class="fa-solid fa-user-lock"></i>
            <span>TODAS LAS ÁREAS HAN SIDO ACEPTADAS.</span>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const faqTriggers = document.querySelectorAll('.accordion-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const body = trigger.nextElementSibling;

            // 1. Cerrar otros acordeones abiertos
            document.querySelectorAll('.accordion-item-premium').forEach(item => {
                if (item !== parent && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            // 2. Alternar el actual
            const isActive = parent.classList.toggle('active');
            if (isActive) {
                //scrollHeight calcula el tamaño real del contenido interno
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });
});

const modalData = {
    // ECOSISTEMA DE DATOS
    'modal-powerquery': '<h2>Arquitectura Power Query</h2><p>Implementación de flujos ETL (Extract, Transform, Load) de alta eficiencia. Diseñamos conexiones robustas a múltiples fuentes de datos, garantizando la integridad y limpieza automatizada mediante lenguajes M y optimización de consultas.</p>',
    'modal-vba': '<h2>Automatización VBA</h2><p>Desarrollo de macros de alto rendimiento y scripts de optimización supervisados por el <strong>Técnico Angel Manuel Guevara Chavarria</strong>. Automatizamos tareas repetitivas en el entorno Office para maximizar la productividad operativa.</p>',
    'modal-python': '<h2>Modelado Python</h2><p>Despliegue de scripts avanzados para análisis de datos, automatización de sistemas y procesamiento de grandes volúmenes de información. Utilizamos Python como motor principal para la creación de herramientas de diagnóstico y soporte.</p>',
    'modal-bi': '<h2>Visualización BI</h2><p>Creación de tableros de control (Dashboards) interactivos. Transformamos datos complejos en indicadores visuales estratégicos que facilitan la toma de decisiones basada en evidencia técnica.</p>',

    // RECURSOS DIRECTIVOS
    'modal-dossier': '<h2>Dossier Técnico 2026</h2><p>Acceso al compendio oficial de capacidades de OLTSC. Este documento detalla nuestras especificaciones técnicas, metodologías de trabajo y el catálogo de soluciones de automatización disponibles para la presente gestión.</p>',
    'modal-seguridad': '<h2>Protocolos de Seguridad</h2><p>Nuestra infraestructura opera bajo estrictos estándares de ciberseguridad. Implementamos auditorías constantes en nuestros códigos y procesos para garantizar la protección de la propiedad intelectual y la confidencialidad de los datos.</p>',
    'modal-consultoria': '<h2>Consultoría Directa</h2><p>Canal exclusivo de enlace con nuestra dirección técnica. Ofrecemos asesoramiento personalizado para la resolución de conflictos en arquitecturas de datos y optimización de flujos de trabajo institucionales.</p>',
    'modal-base': '<h2>Base de Conocimientos</h2><p>Repositorio centralizado de documentación, guías de usuario y tutoriales técnicos. Diseñado para ofrecer soporte autónomo y facilitar el aprendizaje continuo sobre nuestras herramientas de automatización.</p>',

    // ÁREA LEGAL
    'modal-privacidad': '<h2>Privacidad de Datos</h2><p>En OLTSC, la seguridad de su información es nuestra prioridad. Cumplimos con estándares internacionales de encriptación SSL y políticas de tratamiento de datos que aseguran que su información técnica y personal jamás sea compartida con terceros sin autorización expresa.</p>',
    'modal-terminos': '<h2>Términos y Condiciones</h2><p>El acceso y uso de los módulos, scripts y documentación de OLTSC están sujetos a la licencia técnica institucional 2026. Queda prohibida la redistribución de código no autorizado o el uso comercial de nuestras herramientas sin el aval del titular.</p>',
    'modal-politicas': '<h2>Políticas de Servicio</h2><p>Nuestros servicios de soporte se rigen por acuerdos de nivel de servicio (SLA) que garantizan tiempos de respuesta óptimos y soluciones técnicas definitivas bajo la supervisión de expertos certificados.</p>',
    'modal-cookies': '<h2>Gestión de Cookies</h2><p>Este sitio utiliza cookies técnicas necesarias para el correcto funcionamiento de los sistemas y el análisis de tráfico anónimo. Esto nos permite optimizar la experiencia de usuario y la velocidad de carga de nuestras herramientas.</p>'
};


function openModal(id) {
    const modal = document.getElementById('infoModal');
    const body = document.getElementById('modal-body-text');
    body.innerHTML = modalData[id] || '<h2>Información OLTSC</h2><p>Contenido técnico en proceso de actualización v.2.4</p>';
    modal.style.display = 'block';
}

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('infoModal').style.display = 'none';
};

window.onclick = (event) => {
    if (event.target == document.getElementById('infoModal')) {
        document.getElementById('infoModal').style.display = 'none';
    }
};

(function() {
    const form = document.getElementById('free-reg-form');
    const phoneInput = document.getElementById('reg-phone');
    const modal = document.getElementById('reg-success-modal');

    // VALIDACIÓN DE TELÉFONO (Formato 0000-0000)
    phoneInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '').slice(0, 8);
        if (val.length > 4) {
            val = val.slice(0, 4) + '-' + val.slice(4);
        }
        e.target.value = val;
    });

    // CIERRE DE MODAL
    window.closeRegModal = () => {
        modal.style.display = 'none';
    };

    // ENVÍO Y AUTOLIMPIEZA
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('reg-submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerText = "PROCESANDO...";

        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Mostrar ventana emergente de éxito
                modal.style.display = 'flex';
                
                // AUTOLIMPIEZA TOTAL
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = "CONFIRMAR REGISTRO GRATUITO";
            } else {
                alert("Error al enviar el registro. Intente de nuevo.");
                submitBtn.disabled = false;
                submitBtn.innerText = "CONFIRMAR REGISTRO GRATUITO";
            }
        } catch (error) {
            console.error("Error:", error);
            submitBtn.disabled = false;
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const aiBtn = document.getElementById('ai-send-btn');
    const aiInput = document.getElementById('ai-user-query');
    const aiArea = document.getElementById('ai-response-area');

const oltscKnowledge = {
    // === PROTOCOLOS DE ENTRADA (SALUDOS Y SLANG) ===
    "hola": "Protocolo de saludo recibido. Bienvenido al terminal de soporte de OLTSC. Soy la interfaz cognitiva del sistema. ¿En qué área técnica o académica puedo asistirle?",
    "buenos dias": "Buenos días. Los sistemas de OLTSC están operativos. ¿Desea consultar el Dossier Técnico o iniciar su proceso de formación?",
    "buenas tardes": "Buenas tardes. El ecosistema se encuentra en fase de monitoreo activo. ¿Cómo puedo asistirle en su arquitectura de datos hoy?",
    "buenas noches": "Buenas noches. Aunque sea horario nocturno, nuestras terminales virtuales y la IA de soporte operan 24/7. ¿En qué puedo ayudarle?",
    "que tal": "Saludo procesado. Me encuentro en estado óptimo de ejecución. ¿Listo para escalar sus habilidades técnicas al Nivel Profesional?",
    "ola k onda": "Saludo informal detectado y aceptado. Bienvenido al entorno de élite de OLTSC. Aquí transformamos la curiosidad en ingeniería de alto rendimiento. ¿Qué quieres aprender hoy?",
    "ola q onda": "Protocolo de saludo relajado recibido. En OLTSC hablamos todos los lenguajes, pero nuestra especialidad son los lenguajes de datos. ¿Te interesa saber sobre el CDI o los niveles?",
    "que onda": "Estado del sistema: Activo. Saludo recibido. ¿Buscas optimizar tus procesos corporativos o vienes por el registro gratuito?",
    "hi": "System greeting protocol activated. Welcome to OLTSC support. How can I assist your technical journey today?",
    "saludos": "Reciba un saludo institucional de parte del Técnico Angel Guevara y el equipo de OLTSC. ¿Qué información técnica requiere?",
    "ola": "Ja, ja, ja. Protocolo de saludo recibido. Bienvenido al terminal de soporte de OLTSC. Soy la interfaz cognitiva del sistema. ¿En qué área técnica o académica puedo asistirle?",

    // === SECCIÓN 1: IDENTIDAD INSTITUCIONAL Y FILOSOFÍA ===
    "que es": "OLTSC (Office Long-Terms Servicing Channel) es un ecosistema educativo de ingeniería aplicada. No es una simple academia de computación; es un entorno de alto rendimiento donde transformamos usuarios en arquitectos de soluciones Microsoft, especializados en la optimización de la productividad corporativa mediante automatización avanzada.",
    "fundador": "El sistema es una creación intelectual y técnica del Técnico Angel Manuel Guevara Chavarria. Como Director Técnico y Arquitecto de Sistemas, su visión es estandarizar la eficiencia digital a nivel global, supervisando personalmente los protocolos de encriptación y la metodología de enseñanza.",
    "vision": "Dominar el mercado global de capacitación LTSC para 2026, convirtiéndonos en el estándar de oro para la certificación técnica en arquitectura de datos y automatización con IA.",
    "mision": "Democratizar la computación de alto nivel mediante el uso de terminales virtuales y metodologías ágiles, eliminando la brecha entre el conocimiento teórico y la ejecución profesional en entornos de alta presión.",
    "valores": "Precisión matemática, integridad de datos ISO/IEC 27001, innovación disruptiva, profesionalismo absoluto y lealtad al protocolo institucional.",
    "historia": "OLTSC nace de la necesidad de cerrar la brecha técnica en el manejo de herramientas LTSC (Long-Term Servicing Channel), evolucionando de un centro de capacitación a un ecosistema digital con infraestructura propia en la nube.",

    // === SECCIÓN 2: RUTA ACADÉMICA (LOS 5 NIVELES DE PODER) ===
    "niveles": "La currícula OLTSC es una escalera de poder técnico de 5 niveles: 1. Principiante (Cimientos); 2. Intermedio (Estandarización); 3. Avanzado (Ingeniería); 4. Maestro (Arquitectura); 5. Profesional (Alta Gerencia).",
    "principiante": "Nivel 1: Es la fase de 'Cero Absoluto'. Dominamos la anatomía del software, lógica de celdas pura, formatos condicionales jerárquicos y la limpieza de datos (Data Cleaning) para evitar la entropía en los sistemas.",
    "intermedio": "Nivel 2: Estandarización Institucional. Aquí el estudiante aprende funciones lógicas anidadas, búsqueda indexada profesional, y la creación de reportes dinámicos que siguen normas de auditoría internacional.",
    "avanzado": "Nivel 3: Ingeniería de Automatización. Introducción a Power Query (ETL), modelado de datos relacionales y la construcción de Dashboards de Inteligencia de Negocios que responden en tiempo real.",
    "maestro": "Nivel 4: Arquitectura de Sistemas. Dominio de Microsoft Access para bases de datos relacionales complejas y uso de Microsoft Visio para la diagramación de flujos de ingeniería y procesos de negocio (BPMN).",
    "profesional": "Nivel 5: Maestría en Gestión de Proyectos. Uso de Microsoft Project para el control de rutas críticas y diseño de ecosistemas de KPIs (Indicadores Clave de Desempeño) para la toma de decisiones gerenciales de alto impacto.",

    // === SECCIÓN 3: ECOSISTEMA TÉCNICO Y SOFTWARE ===
    "software": "Nuestro stack operativo es el paquete Microsoft LTSC: Word (Documentación), Excel (Cerebro de datos), PowerPoint (Estrategia), Access (Bases de datos), Visio (Ingeniería), Project (Gestión) y Forms (Captura).",
    "excel": "El Excel en OLTSC es ingeniería pura. Enseñamos Power Query, Power Pivot, lenguajes DAX y M, además de la integración profunda con VBA (Visual Basic) y Python para analítica de datos a gran escala.",
    "metodologia": "Aplicamos metodologías SCRUM y ÁGILE. Nuestros estudiantes trabajan con 'Sprints' de aprendizaje y entregables de 'Calidad de Producción', simulando entornos laborales reales de alta tecnología.",
    "automatizacion": "La automatización en OLTSC se basa en la eliminación del error humano. Mediante scripts de VBA y flujos de Power Automate, reducimos jornadas laborales de 8 horas a procesos automáticos de 5 minutos.",
    "python": "Utilizamos Python dentro de Excel para tareas de ciencia de datos, machine learning básico y procesamiento de grandes volúmenes de información que exceden las capacidades de las fórmulas tradicionales.",
    "vba": "Visual Basic for Applications (VBA) es nuestro lenguaje de automatización nativo. Con él, creamos formularios inteligentes, aplicaciones internas y automatizamos cualquier tarea repetitiva en Office.",

    // === SECCIÓN 4: INFRAESTRUCTURA Y CDI (IDENTIDAD) ===
    "cdi": "El Carnet de Identificación Digital (CDI) es su firma encriptada dentro del ecosistema. Proporciona un UID (Unique Identification) que valida sus competencias, le otorga acceso a terminales virtuales y lo identifica como miembro de la comunidad de élite.",
    "terminales": "OLTSC provee acceso a Estaciones de Computación Virtuales (VDI). Son servidores de alto rendimiento que permiten a los estudiantes ejecutar procesos que sus computadoras locales no podrían soportar.",
    "biblioteca": "La Biblioteca Técnica de OLTSC es un repositorio privado con más de 5,000 scripts, plantillas de ingeniería y manuales de procedimiento exclusivos para portadores de CDI.",
    "nube": "Nuestra infraestructura Cloud es híbrida, utilizando servidores distribuidos para garantizar que el acceso a la formación y a las herramientas de trabajo no se interrumpa nunca.",

    // === SECCIÓN 5: SEGURIDAD Y PRIVACIDAD ===
    "seguridad": "Cumplimos con el estándar ISO/IEC 27001. Nuestra arquitectura de red es auditada constantemente por Angel Guevara para garantizar que los datos de los estudiantes y los activos de la institución sean inviolables.",
    "encriptacion": "Usamos cifrado AES-256 para la generación de carnets CDI y la protección de las bases de datos académicas. La seguridad no es una opción, es nuestro pilar fundamental.",
    "privacidad": "Protocolo de Privacidad: Cero distribución de datos a terceros. Toda la información de registro se utiliza exclusivamente para la gestión académica y la validación de identidad digital.",

    // === SECCIÓN 6: ACCESO Y REGISTRO ===
    "gratis": "La inscripción gratuita es un beneficio institucional limitado. Permite la obtención del CDI inicial, acceso a la plataforma básica y participación en webinars técnicos de nivel principiante.",
    "registro": "Para registrarse, el sistema requiere una validación de identidad. Una vez completado el formulario profesional, se inicia el protocolo de emisión de su carnet digital y se le asigna un área de especialización.",
    "requisitos": "Solo se requiere una conexión a internet estable y la ambición de dejar de ser un usuario promedio para convertirse en un experto técnico de alto nivel.",

    // === SECCIÓN 7: CONTACTO Y SOPORTE ===
    "contacto": "Canal de Soporte Centralizado: Teléfono (+502) 5127-5371. Email Institucional: oltsc@outlook.es / oltsc@gmail.com. Atención directa por el equipo de soporte técnico.",
    "ubicacion": "Somos una entidad global nativa digital. Nuestras operaciones se coordinan desde la infraestructura central en la nube, con soporte técnico regional disponible para toda Latinoamérica.",
    "horarios": "Terminales y IA: 24/7. Soporte Humano: Lunes a Viernes de 08:00 a 18:00 horas (GMT-6).",

    // === SECCIÓN 8: TERMINOLOGÍA AVANZADA (DATOS) ===
    "kpi": "Los Key Performance Indicators son métricas de éxito. En OLTSC enseñamos a extraer datos crudos y transformarlos en tableros de control que muestran la salud financiera y operativa de una empresa.",
    "power query": "Es el motor de transformación de datos (ETL). Permite limpiar y conectar datos de miles de fuentes (SQL, Web, JSON) sin escribir una sola línea de código complejo.",
    "dossier": "El Dossier Técnico v2.4 es el documento maestro de especificaciones de OLTSC. Contiene el mapa de ruta de todas las herramientas y actualizaciones del ecosistema para el año en curso.",
    "arquitectura de datos": "Es el diseño de cómo la información fluye desde la captura (Forms) hasta el análisis final (Dashboards), pasando por el almacenamiento seguro (Access).",
    "scrum": "Es el marco de trabajo ágil que usamos. Dividimos el aprendizaje en 'Sprints' para que el estudiante vea resultados tangibles cada semana, no cada año.",

    // === PROTOCOLOS DE SALIDA (DESPEDIDAS) ===
    "adios": "Finalizando sesión de consulta. Recuerde que la eficiencia es el único camino al éxito. El terminal OLTSC queda a su disposición.",
    "gracias": "No hay de qué. Es mi función optimizar su acceso a la información. Que tenga un día productivo.",
    "bye": "Session terminated. Your CDI remains active. See you at the next login.",
    "nos vemos": "Hasta la próxima interacción. No olvide revisar las actualizaciones en la Biblioteca Técnica.",
    "chao": "Protocolo de despedida recibido. Cerrando conexión de soporte. ¡Siga automatizando!",

    // === PROTOCOLOS DE SEGURIDAD Y RESPETO (FILTRO DE MODISMOS) ===
    "que putas": "ERROR DE PROTOCOLO: Se ha detectado una falta de integridad en el lenguaje. En OLTSC mantenemos un estándar de élite. Por favor, reformule su consulta con el respeto que merece la arquitectura del sistema y el Técnico Angel Guevara.",
    "mira vos": "Protocolo de atención personalizado activo. Te escucho. ¿Qué área de nuestra infraestructura de datos te genera curiosidad hoy?",
    "que es esta mierda": "ALERTA INSTITUCIONAL: El lenguaje ofensivo no es compatible con el acceso al CDI. OLTSC es un entorno profesional ISO/IEC 27001. Se le solicita mantener la profesionalidad para evitar el bloqueo de sesión.",
    "mira que eso": "Se refiere a nuestra infraestructura técnica. Es un ecosistema de alto rendimiento diseñado para transformar procesos. ¿Desea saber sobre los terminales virtuales o los niveles?",

    // === PAGOS Y CONTRATACIÓN (REDIRECCIÓN AL FUNDADOR) ===
    "pago": "PROTOCOL INFO: Los detalles financieros, costos de niveles y métodos de pago son gestionados exclusivamente por el Técnico Angel Manuel Guevara. Mi función es técnica y académica. Por favor, inicie una 'Consultoría Directa' desde el menú del sitio para tratar este tema.",
    "cuanto cuesta": "La inversión para acceder a los niveles superiores y terminales virtuales se coordina directamente con la dirección técnica de OLTSC. Por favor, use los canales oficiales de WhatsApp o correo electrónico para obtener el dossier de precios.",
    "pagar": "Los protocolos de pago no se procesan vía chat por seguridad encriptada. Debe conversar directamente con el administrador del sistema para recibir las credenciales de pago oficiales.",
    "comprar": "Para adquirir licencias, acceso a scripts o niveles académicos, por favor establezca contacto directo con el Técnico Guevara.",

    // === CERTIFICACIONES (CRONOGRAMA) ===
    "certifican": "Afirmativo. OLTSC emite certificaciones técnicas de alto valor curricular al finalizar cada nivel. Para obtenerla, el estudiante debe cumplir con los Sprints de aprendizaje y consultar el 'Cronograma de Certificaciones' vigente en el portal.",
    "diploma": "Al completar el Nivel Profesional (v5), se emite un certificado avalado por nuestra arquitectura institucional. Verifique las fechas de evaluación en el cronograma de la base de conocimientos.",
    "titulo": "Nuestras certificaciones validan su capacidad como Arquitecto de Datos. Revise el calendario institucional para las próximas validaciones de CDI.",

    // === APRENDIZAJE (QUE VOY A APRENDER?) ===
    "que voy a aprender": "Aprenderá a dejar de ser un usuario promedio. Dominará desde la lógica de celdas pura hasta la automatización con VBA y Python, creación de Dashboards de Inteligencia de Negocios y gestión de proyectos con Microsoft Project.",
    "para que sirve": "Sirve para optimizar flujos de trabajo corporativos. Reducirá tareas de horas a segundos mediante scripts y arquitectura de bases de datos profesional.",
    "que enseñan": "Enseñamos el dominio total del paquete Office LTSC: Excel avanzado, Access relacional, Visio técnico y automatización industrial.",

    // === SALUDOS INFORMALES Y JERGA ===
    "que onda": "Onda procesada. Todo operativo en los servidores de OLTSC. ¿Qué nivel te interesa escalar hoy?",
    "ola k onda": "Saludo informal detectado. Aquí en el terminal de Angel Guevara no perdemos el tiempo: ¿Quieres automatizar o seguir haciendo todo a mano?",
    "hola": "Protocolo de saludo recibido. Bienvenido al terminal de soporte de OLTSC. ¿En qué protocolo técnico puedo asistirte hoy?",
    
    // === CONOCIMIENTO TÉCNICO (DETALLE MÁXIMO) ===
    "cdi": "El Carnet de Identificación Digital es su firma encriptada. Sin él, el acceso a las terminales virtuales de alto rendimiento está restringido.",
    "seguridad": "Operamos bajo ISO/IEC 27001. Su identidad y sus scripts están protegidos por encriptación de grado militar supervisada por el equipo técnico.",
    "niveles": "La ruta consta de 5 fases: Principiante, Intermedio, Avanzado, Maestro y Profesional. Cada una diseñada para una competencia específica.",
    "angel guevara": "Es nuestro Director Técnico y Arquitecto de Sistemas. Egresado de Honor y creador de toda la infraestructura que estás navegando.",

    // === DESPEDIDAS ===
    "chao": "Protocolo de despedida recibido. Cerrando conexión de soporte. ¡Siga automatizando!",
    "adios": "Finalizando sesión. Recuerde que su CDI mantiene el acceso a la infraestructura activo. Que tenga un día productivo.",
    "gracias": "No hay de qué. Es mi función optimizar su acceso a la información técnica de OLTSC."
};

    function processQuery() {
        const query = aiInput.value.toLowerCase();
        if (!query) return;

        let response = "Lo siento, no tengo información específica sobre eso. Intenta preguntar sobre 'niveles', 'CDI', 'fundador' o 'qué es OLTSC'.";
        let showRegisterBtn = false;

        for (let key in oltscKnowledge) {
            if (query.includes(key)) {
                response = oltscKnowledge[key];
                if (key === "registro" || key === "gratis" || key === "niveles") showRegisterBtn = true;
                break;
            }
        }

        aiArea.innerHTML += `<div class="ai-message user-msg"><strong>Tú:</strong> ${aiInput.value}</div>`;
        
        setTimeout(() => {
            let aiHtml = `<div class="ai-message bot-msg"><strong>OLTSC-AI:</strong> ${response}`;
            if (showRegisterBtn) {
                aiHtml += `<br><br><a href="#freereg" class="ai-action-btn">Ir al Registro Gratuito</a>`;
            }
            aiHtml += `</div>`;
            aiArea.innerHTML += aiHtml;
            aiArea.scrollTop = aiArea.scrollHeight;
        }, 500);

        aiInput.value = "";
    }

    aiBtn.addEventListener('click', processQuery);
    aiInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') processQuery(); });
});

function processQuery() {
    const query = aiInput.value.toLowerCase().trim();
    if (!query) return;

    // --- FILTRO DE SEGURIDAD (ANTI-OFENSIVO/SEXUAL) ---
    // Esta regex detecta palabras clave comunes de insultos, discriminación o contenido adulto
    const offensiveRegex = /(insulto1|insulto2|sexo|porn|racista|idiota|estupido|mierda|puto|homofobico|nazi)/i; 
    // Nota: Reemplaza 'insulto1', 'insulto2' por las palabras reales que desees bloquear

    if (offensiveRegex.test(query)) {
        const securityResponse = "PROTOCOL ERROR: Se ha detectado una violación a las normas de conducta de OLTSC. Este asistente está programado para fines técnico-educativos. Por favor, mantenga un lenguaje profesional para continuar.";
        
        aiArea.innerHTML += `<div class="ai-message user-msg"><strong>Tú:</strong> ${aiInput.value}</div>`;
        setTimeout(() => {
            aiArea.innerHTML += `<div class="ai-message bot-msg" style="border-left-color: #ef4444; background: rgba(239, 68, 68, 0.1) !important;">
                <strong>SISTEMA DE SEGURIDAD:</strong> ${securityResponse}</div>`;
            aiArea.scrollTop = aiArea.scrollHeight;
        }, 300);
        aiInput.value = "";
        return;
    }

    // --- PROCESAMIENTO NORMAL DE CONOCIMIENTO ---
    let response = "Lo siento, no tengo información específica sobre eso en mi base de datos técnica. Puedes preguntar por 'niveles', 'CDI', 'seguridad' o 'quién es Angel Guevara'.";
    let showRegisterBtn = false;

    // Búsqueda por palabras clave
    for (let key in oltscKnowledge) {
        if (query.includes(key)) {
            response = oltscKnowledge[key];
            if (["registro", "gratis", "niveles", "inscripcion"].some(k => query.includes(k))) {
                showRegisterBtn = true;
            }
            break;
        }
    }

    // Renderizado de respuesta
    aiArea.innerHTML += `<div class="ai-message user-msg"><strong>Tú:</strong> ${aiInput.value}</div>`;
    setTimeout(() => {
        let aiHtml = `<div class="ai-message bot-msg"><strong>OLTSC-AI:</strong> ${response}`;
        if (showRegisterBtn) {
            aiHtml += `<br><br><a href="#cdi" class="ai-action-btn">Ir al Registro de Identidad</a>`;
        }
        aiHtml += `</div>`;
        aiArea.innerHTML += aiHtml;
        aiArea.scrollTop = aiArea.scrollHeight;
    }, 500);

    aiInput.value = "";
}

function processQuery() {
    const query = aiInput.value.toLowerCase().trim();
    if (!query) return;

    // --- PROTOCOLO DE INTEGRIDAD (Filtro de Seguridad) ---
    // Detecta insultos, contenido sexual, racismo, homofobia o ataques personales
    const toxicPatterns = [
        "puto", "mierda", "pendejo", "idiota", "estupido", "maricon", "nazi", 
        "sexo", "porno", "negro de", "indio de", "cerote", "hijo de", "basura",
        "mal parido", "perra", "zorra", "gay", "lesbiana" // Añade más según tu región
    ];

    if (toxicPatterns.some(word => query.includes(word))) {
        const securityAlert = "VIOLACIÓN DE PROTOCOLO: Se ha detectado lenguaje no permitido. El sistema OLTSC mantiene un estándar de profesionalismo absoluto. Su consulta ha sido bloqueada y registrada por el sistema de seguridad institucional.";
        
        renderMessage("Tú", aiInput.value, "user-msg");
        setTimeout(() => {
            renderMessage("SEGURIDAD OLTSC", securityAlert, "security-msg");
        }, 300);
        aiInput.value = "";
        return;
    }

    // --- PROCESAMIENTO DE CONOCIMIENTO ---
    let response = "Lo siento, esa información no se encuentra en el Dossier Institucional v.2.4. Por favor, consulta sobre 'niveles', 'CDI', 'seguridad' o 'Angel Guevara'.";
    let showAction = false;

    // Búsqueda inteligente por palabras clave
    for (let key in oltscKnowledge) {
        if (query.includes(key)) {
            response = oltscKnowledge[key];
            if (["registro", "gratis", "inscripcion", "entrar", "unirme"].some(k => query.includes(k))) {
                showAction = true;
            }
            break;
        }
    }

    // --- RENDERIZADO FINAL ---
    renderMessage("Tú", aiInput.value, "user-msg");
    setTimeout(() => {
        let finalHtml = `<strong>OLTSC-AI:</strong> ${response}`;
        if (showAction) {
            finalHtml += `<br><br><a href="#cdi" class="ai-action-btn">INICIAR REGISTRO DIGITAL</a>`;
        }
        renderMessage("IA", finalHtml, "bot-msg", true);
    }, 500);

    aiInput.value = "";
}

function renderMessage(sender, text, type, isHtml = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${type}`;
    if (isHtml) {
        msgDiv.innerHTML = text;
    } else {
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    }
    aiArea.appendChild(msgDiv);
    aiArea.scrollTop = aiArea.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a tus elementos específicos
    const aiBtn = document.getElementById('ai-send-btn');
    const aiInput = document.getElementById('ai-user-query');
    const aiArea = document.getElementById('ai-response-area');
    const resetBtn = document.getElementById('ai-reset-btn'); // El botón de reinicio

    // Variables de control
    let securityWarnings = 0;
    let systemLocked = false;

    // --- FUNCIÓN DE REINICIO ---
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita cualquier comportamiento por defecto

            // 1. Limpiar el contenido visual del área de chat
            aiArea.innerHTML = ""; 

            // 2. Insertar mensaje inicial de bienvenida
            const welcomeMsg = document.createElement('div');
            welcomeMsg.className = "ai-message";
            welcomeMsg.innerHTML = `<strong>OLTSC-AI:</strong> Hola de nuevo. Terminal reiniciada con éxito. ¿En qué puedo asistirte hoy?`;
            aiArea.appendChild(welcomeMsg);

            // 3. Resetear variables internas de seguridad
            securityWarnings = 0;
            systemLocked = false;

            // 4. Limpiar y habilitar el input
            aiInput.value = "";
            aiInput.disabled = false;
            aiInput.placeholder = "Escribe tu duda técnica aquí...";
            
            // 5. Reactivar botón de envío si estaba bloqueado
            aiBtn.disabled = false;
            aiBtn.style.opacity = "1";

            console.log("Terminal OLTSC Reiniciada"); // Para que verifiques en la consola (F12)
        });
    }

    // ... aquí sigue tu función processQuery() y el evento del aiBtn ...
});


// Función para cambiar entre Postulación y Verificación
function switchRRHH(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
    document.getElementById(`rrhh-content-${tab}`).classList.add('active');
}

// Motor de Verificación de CDI para la Sección
function verifyCDIEngine() {
    const code = document.getElementById('cdi-verify-input').value.toUpperCase().trim();
    const result = document.getElementById('cdi-status-result');
    
    // Base de datos de prueba
    const data = {
        "OLTSC-2024": "EGRESADO NIVEL 5: PROFESIONAL - Verificado por Angel Guevara.",
        "OLTSC-ELITE": "CONSULTOR TÉCNICO SENIOR - Facultad de Ingeniería.",
        "OLTSC-ALFA": "EGRESADO NIVEL 1: PRINCIPIANTE - Verificado."
    };

    result.innerHTML = "Escaneando registros...";

    setTimeout(() => {
        if(data[code]) {
            result.innerHTML = `<span style="color: #22c55e;"><i class="fas fa-check-circle"></i> ${data[code]}</span>`;
        } else {
            result.innerHTML = `<span style="color: #ef4444;"><i class="fas fa-times-circle"></i> CÓDIGO NO VÁLIDO EN EL SISTEMA.</span>`;
        }
    }, 1000);
}

// Manejador de Pestañas de RRHH
function switchRRHH(tabId, event) {
    // 1. Quitar clase active de todos los botones
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 2. Quitar clase active de todos los paneles
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    // 3. Activar el botón actual y su panel
    event.currentTarget.classList.add('active');
    document.getElementById(`pane-${tabId}`).classList.add('active');
}

// Motor de Verificación de CDI (Actualizado)
function runCDIVerification() {
    const input = document.getElementById('cdi-verify-input').value.toUpperCase().trim();
    const resultArea = document.getElementById('cdi-status-result');
    
    if(!input) return;

    resultArea.innerHTML = "<span style='color: #d4af37;'>Procesando protocolo de seguridad...</span>";

    setTimeout(() => {
        // Simulación basada en los carnets del sistema
        if(input === "OLTSC-2024" || input === "OLTSC-7792") {
            resultArea.innerHTML = `<div style="background: rgba(34, 197, 94, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #22c55e; color: #22c55e; margin-top: 15px;">
                <i class="fas fa-check-circle"></i> CDI IDENTIFICADO: Egresado de Honor | Acceso Nivel Profesional.
            </div>`;
        } else {
            resultArea.innerHTML = `<div style="background: rgba(239, 68, 68, 0.1); padding: 15px; border-radius: 8px; border: 1px solid #ef4444; color: #ef4444; margin-top: 15px;">
                <i class="fas fa-times-circle"></i> ERROR: Credencial no encontrada en la base de datos de Angel Guevara.
            </div>`;
        }
    }, 1200);
}

const URL_SB = 'https://gmhtmwozpjrbgcrpwfqf.supabase.co';
const KEY_SB = 'sb_publishable_gdLEbiqFRj7edL5iIL1SqQ_Jx1lVtjp';
const _client = supabase.createClient(URL_SB, KEY_SB);

async function validarSistema() {
    const inp = document.getElementById('cdi-input').value.trim().toLowerCase();
    const res = document.getElementById('render-result');

    if(!inp) return;

    res.innerHTML = `<div style="color:var(--gold); padding:20px;">VERIFICANDO CREDENCIAL...</div>`;

    const { data, error } = await _client.from('CDI').select('*').eq('codigo_cdi', inp).single();

    if(error || !data) {
        res.innerHTML = `<div style="color:#ff4d4d; border:1px solid #ff4d4d; padding:20px; border-radius:15px; margin-top:20px;">ACCESO DENEGADO: CÓDIGO INVÁLIDO</div>`;
        return;
    }

    res.innerHTML = `
        <div class="profile-result">
            <div style="display:flex; align-items:center; gap:20px;">
                <i class="fas fa-id-badge" style="font-size:3rem; color:var(--gold)"></i>
                <div style="text-align:left">
                    <h3 style="margin:0">${data.primer_nombre} ${data.primer_apellido}</h3>
                    <p style="color:var(--gold); margin:0; font-weight:700;">${data.rango}</p>
                </div>
            </div>
            <button class="btn-cert" onclick="descargarCertificado('${data.primer_nombre}')">
                <i class="fas fa-file-download"></i> CERTIFICADO
            </button>
        </div>
    `;
}

function descargarCertificado(nombre) {
    const certText = `CERTIFICADO DE AUTENTICIDAD LTSC\n\nPor la presente se valida a ${nombre} como miembro activo de la red de ingeniería.\nProtocolo: CDI-v3\nEstado: Verificado`;
    const blob = new Blob([certText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado_${nombre}.txt`;
    a.click();
}

function navTab(id, e) {
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    document.getElementById('view-' + id).style.display = 'block';
    document.querySelectorAll('.t-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
}

function navTab(id, e) {
    // 1. Ocultar todos los contenidos
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // 2. Quitar el estado activo a todos los botones
    document.querySelectorAll('.t-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Mostrar el panel seleccionado y activar su botón
    document.getElementById('view-' + id).classList.add('active');
    e.currentTarget.classList.add('active');
}

function activarAsistenteIA() {
    // 1. Localizar la sección de la IA
    const seccionIA = document.getElementById('ai-help');
    const inputIA = document.getElementById('ai-user-query');

    if (seccionIA) {
        // 2. Desplazamiento suave (Scroll)
        seccionIA.scrollIntoView({ behavior: 'smooth' });

        // 3. Efecto de carga y autocompletado
        setTimeout(() => {
            inputIA.focus();
            inputIA.value = "Necesito soporte técnico... ";
            
            // Animación visual opcional en el input
            inputIA.style.border = "2px solid #d4af37";
            setTimeout(() => inputIA.style.border = "", 1500);
        }, 800);
    } else {
        console.error("No se encontró la sección #ai-help");
    }
}

// Variable global para almacenar la elección del estudiante
let ltsc_tipo_seleccionado = "";

/**
 * Activa el panel de agendamiento y guarda el tipo de sesión
 * @param {string} tipo - El nombre de la modalidad elegida
 */
function seleccionarTipo(tipo) {
    // 1. Guardamos la selección en la variable global
    ltsc_tipo_seleccionado = tipo;

    // 2. Localizamos los elementos por sus nuevos IDs únicos
    const panelControl = document.getElementById('booking-controls');
    const textoResumen = document.getElementById('selected-type-text');

    if (panelControl && textoResumen) {
        // Actualizamos el texto del panel con un estilo de terminal
        textoResumen.innerText = `MODALIDAD ACTIVA: ${tipo.toUpperCase()}`;
        
        // Mostramos el panel de fecha y botón con un efecto suave
        panelControl.style.display = 'block';
        
        // Scroll automático al panel de confirmación para mejorar la experiencia
        panelControl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Envía los datos de la cita a Supabase usando el CDI validado
 */
async function enviarCita() {
    const inputFecha = document.getElementById('appointment-date');
    const cdiValidado = document.getElementById('cdi-input'); // Usamos el ID de tu validador principal

    // Validaciones de seguridad antes del envío
    if (!ltsc_tipo_seleccionado) {
        alert("SISTEMA: Error de protocolo. Debe seleccionar una modalidad primero.");
        return;
    }

    if (!inputFecha || !inputFecha.value) {
        alert("SISTEMA: Coordenada temporal no definida. Ingrese fecha y hora.");
        return;
    }

    if (!cdiValidado || !cdiValidado.value) {
        alert("SISTEMA: Credencial CDI no detectada. Valide su identidad arriba.");
        document.getElementById('ai-help').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    try {
        // Intento de inserción en la tabla 'CITAS'
        const { data, error } = await _client
            .from('CITAS')
            .insert([{ 
                estudiante_id: cdiValidado.value.toLowerCase().trim(), 
                tipo_sesion: ltsc_tipo_seleccionado, 
                fecha_hora: inputFecha.value 
            }]);

        if (error) throw error;

        // Respuesta de éxito con estética de comando
        alert(`REGISTRO EXITOSO:\n--------------------------\nSESIÓN: ${ltsc_tipo_seleccionado}\nID: ${cdiValidado.value}\nESTADO: Pendiente de Auditoría`);
        
        // Limpiamos el formulario para prevenir duplicados accidentales
        inputFecha.value = "";
        document.getElementById('booking-controls').style.display = 'none';

    } catch (err) {
        console.error("Error en la red central:", err);
        alert("FALLO CRÍTICO: No se pudo conectar con la red de base de datos.");
    }
}

async function verificarParaCita() {
    const cdiInput = document.getElementById('cdi-cita-verificar').value.trim().toLowerCase();
    const statusDiv = document.getElementById('status-auth');
    const step2 = document.getElementById('step-2');
    const btnSubmit = document.getElementById('btn-enviar-cita');
    const hiddenCdi = document.getElementById('hidden-cdi');

    if (!cdiInput) return;

    statusDiv.innerHTML = "<span style='color: #d4af37;'>Verificando...</span>";

    // Consultamos tu tabla CDI en Supabase
    const { data, error } = await _client
        .from('CDI')
        .select('primer_nombre, primer_apellido')
        .eq('codigo_cdi', cdiInput)
        .single();

    if (error || !data) {
        statusDiv.innerHTML = "<span style='color: #ff4d4d;'>✖ CDI NO AUTORIZADO</span>";
        step2.classList.add('disabled-step');
        btnSubmit.disabled = true;
    } else {
        statusDiv.innerHTML = `<span style='color: #22c55e;'>✔ BIENVENIDO, ${data.primer_nombre.toUpperCase()}</span>`;
        
        // ACTIVAMOS EL PASO 2
        step2.classList.remove('disabled-step');
        btnSubmit.disabled = false;
        
        // Guardamos el CDI en el campo oculto para que te llegue al Formspree
        hiddenCdi.value = cdiInput;
        
        // Efecto visual de éxito
        step2.style.border = "1px solid #22c55e";
    }
}

async function validarAccesoCita() {
    const inputCDI = document.getElementById('cdi-verify-input');
    const feedback = document.getElementById('auth-feedback');
    const panelLogistica = document.getElementById('step-logistica');
    const btnAgendar = document.getElementById('btn-agendar');
    const hiddenCDI = document.getElementById('hidden-cdi-form');

    const codigo = inputCDI.value.trim().toLowerCase();

    if (!codigo) {
        feedback.innerText = "SISTEMA: Ingrese credencial.";
        return;
    }

    feedback.innerHTML = "<i class='fa-solid fa-spinner fa-spin'></i> Consultando Red Central...";

    try {
        // Consulta exacta a Supabase
        const { data, error } = await _client
            .from('CDI')
            .select('primer_nombre, primer_apellido')
            .eq('codigo_cdi', codigo)
            .single();

        if (error || !data) {
            feedback.innerHTML = "<span style='color:#ef4444'>✖ ACCESO DENEGADO: ID NO REGISTRADO</span>";
            panelLogistica.classList.add('ltsc-locked');
            btnAgendar.disabled = true;
        } else {
            feedback.innerHTML = `<span style='color:#22c55e'>✔ BIENVENIDO, ${data.primer_nombre}</span>`;
            
            // Desbloquear Paso 2
            panelLogistica.classList.remove('ltsc-locked');
            btnAgendar.disabled = false;
            
            // Inyectar datos al formulario
            hiddenCDI.value = codigo;

            // Animación visual de éxito
            panelLogistica.style.boxShadow = "0 0 30px rgba(34, 197, 94, 0.1)";
        }
    } catch (e) {
        feedback.innerText = "ERROR DE CONEXIÓN.";
    }
}

const OLTSC_IA_SENTINEL = {
    estudianteActivo: "Usuario No Identificado",

    mensajes: {
        clic: "Detecto un intento de acceso al menú raíz. No está autorizado.",
        copiar: "El conocimiento de OLTSC es sagrado. La copia está restringida.",
        f12: "Intento de inspección de arquitectura detectado. He cerrado la brecha.",
        consola: "Analizando rastro digital... Deje de manipular el entorno.",
        imagen: "Las capturas de activos visuales violan el protocolo de seguridad."
    },

    hablar: function(tipo) {
        const sentinel = document.getElementById('oltsc-ia-sentinel');
        const textElement = document.getElementById('ia-text');
        
        // Si el estudiante ya validó su CDI, extraemos el nombre de la variable global (o del input)
        const inputNombre = document.getElementById('cdi-verify-input'); 
        // Nota: Aquí podrías usar una variable global que guardes al validar en Supabase
        
        const advertencia = `${this.estudianteActivo.toUpperCase()}: ${this.mensajes[tipo]}`;
        textElement.innerText = advertencia;
        
        sentinel.classList.remove('ia-hidden');
        
        // Efecto de vibración en la terminal al detectar el error
        sentinel.style.animation = "shake 0.3s ease-in-out";
        setTimeout(() => sentinel.style.animation = "", 300);

        setTimeout(() => sentinel.classList.add('ia-hidden'), 9000);
    },

    blindajeMasivo: function() {
        // Bloqueo de Clic Derecho
        document.addEventListener('contextmenu', e => { e.preventDefault(); this.hablar('clic'); });

        // Bloqueo de Arrastre de Imágenes (Drag and Drop)
        document.addEventListener('dragstart', e => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                this.hablar('imagen');
            }
        });

        // Bloqueo de Combinaciones de Teclas
        document.addEventListener('keydown', e => {
            // Deshabilitar PrintScreen (Captura de pantalla - limitado en navegadores pero ayuda)
            if (e.key === "PrintScreen") {
                navigator.clipboard.writeText(""); // Limpia el portapapeles
                this.hablar('copiar');
            }

            // F12, Ctrl+Shift+I, Ctrl+U, Ctrl+S
            if (e.keyCode === 123 || (e.ctrlKey && (e.shiftKey && (e.keyCode === 73 || e.keyCode === 74) || e.keyCode === 85 || e.keyCode === 83))) {
                e.preventDefault();
                this.hablar('f12');
            }

            // Ctrl+C, Ctrl+V, Ctrl+X
            if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) {
                e.preventDefault();
                this.hablar('copiar');
            }
        });
    }
};

// Integración con tu validación de Supabase anterior:
// Solo tienes que añadir esta línea dentro de tu función 'validarAccesoCita()' cuando el éxito sea confirmado:
// OLTSC_IA_SENTINEL.estudianteActivo = data.primer_nombre; 

document.addEventListener('DOMContentLoaded', () => OLTSC_IA_SENTINEL.blindajeMasivo());

const OLTSC_ANTISHOT = {
    proteger: function() {
        const body = document.body;

        // 1. Detectar pérdida de foco (Si abren otra app de captura)
        window.addEventListener('blur', () => {
            body.classList.add('sec-blur-active');
            OLTSC_IA_SENTINEL.hablar('imagen'); 
        });

        // 2. Restaurar al volver (Opcional, para no arruinar la experiencia)
        window.addEventListener('focus', () => {
            body.classList.remove('sec-blur-active');
        });

        // 3. Bloqueo de Tecla PrintScreen y combinaciones de recortes
        document.addEventListener('keyup', (e) => {
            if (e.key === "PrintScreen" || e.keyCode === 44) {
                // Limpiar el portapapeles inmediatamente
                navigator.clipboard.writeText("ACCESO DENEGADO - PROPIEDAD DE OLTSC");
                this.dispararAlarma();
            }
        });

        // 4. Bloqueo de combinaciones Mac (Cmd+Shift+3/4) y Windows (Win+Shift+S)
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.keyCode === 51 || e.keyCode === 52 || e.keyCode === 83)) {
                this.dispararAlarma();
            }
        });
    },

    dispararAlarma: function() {
        document.body.classList.add('sec-blur-active');
        OLTSC_IA_SENTINEL.hablar('imagen');
        setTimeout(() => {
            document.body.classList.remove('sec-blur-active');
        }, 3000);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    OLTSC_ANTISHOT.proteger();
    
    // Inyectar marca de agua automáticamente
    const wm = document.createElement('div');
    wm.className = 'ltsc-watermark';
    document.body.appendChild(wm);
});
