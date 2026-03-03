import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    
    template: `<div class="layout-footer">
    <div class="footer-container">
        
        <div class="footer-left">
            <h3 class="app-name">m1p13mean-Jeddy-Famenontsoa</h3>
            <p class="copyright">
                © 2026 Tous droits réservés
            </p>
        </div>

        <div class="footer-right">
            <div class="member">
                <strong>Ranivoaritida Jeddy Mendrika</strong>
                <span>ETU001873</span>
            </div>

            <div class="member">
                <strong>ANDRIANTSIMANIRY Iaritiana Famenontsoa</strong>
                <span>ETU001945</span>
            </div>
        </div>

    </div>
</div>`,
styles: [
        `
           .layout-footer {
    background: #ffffff;
    border-top: 1px solid #e5e7eb;
    padding: 30px 20px;
    margin-top: 60px;
}

.footer-container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.app-name {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #4f46e5; /* violet moderne */
}

.footer-left p {
    font-size: 13px;
    color: #6b7280;
}

.footer-right {
    display: flex;
    gap: 40px;
}

.member {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #374151;
}

.member strong {
    font-weight: 600;
}

.member span {
    font-size: 12px;
    color: #9ca3af;
}

/* Hover léger premium */
.member:hover {
    transform: translateY(-2px);
    transition: 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
    .footer-container {
        flex-direction: column;
        text-align: center;
    }

    .footer-right {
        flex-direction: column;
        gap: 15px;
    }
}
        `
    ]
})
export class AppFooter {}
