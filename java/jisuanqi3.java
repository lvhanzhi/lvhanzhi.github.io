package first_box;

import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.BorderLayout;
import javax.swing.JTextField;
import javax.swing.JButton;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class jisuanqi3 extends JFrame{
	private JTextField textField;
	double result=0;
	boolean star=true;
	String operator="=";
	public jisuanqi3() {
		
		JPanel panel = new JPanel();
		getContentPane().add(panel, BorderLayout.NORTH);
		
		textField = new JTextField();
		panel.add(textField);
		textField.setColumns(10);
		
		JButton clear = new JButton("\u6E05\u9664");
		panel.add(clear);
		
		JPanel panel_1 = new JPanel();
		getContentPane().add(panel_1, BorderLayout.CENTER);
		panel_1.setLayout(new GridLayout(4, 4, 0, 0));
		String strs="123+456-789*0.=/";
		JButton[] btns=new JButton[16];
		for(int i=0;i<strs.length();i++) {
			btns[i]=new JButton(strs.charAt(i)+"");
			panel_1.add(btns[i]);
			btns[i].addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent e) {
					// TODO Auto-generated method stub
					String key=e.getActionCommand();
					if("0123456789".indexOf(key)!=-1) {
						if(star) {
							textField.setText(key);
						}
						else {
							textField.setText(textField.getText()+key);
							star=false;
						}
					}
					else {
						if(operator.equals("+")) {
							result+=Double.parseDouble(textField.getText());
						}
						else if(operator.equals("-")) {
							result-=Double.parseDouble(textField.getText());
						}
						else if(operator.equals("*")) {
							result*=Double.parseDouble(textField.getText());
						}
						else if(operator.equals("/")) {
							result/=Double.parseDouble(textField.getText());
						}
						else {
							result=Double.parseDouble(textField.getText());
						}
						textField.setText(result+"");
						operator=key;
						star=true;
					}
				}
			});
			clear.addActionListener(new ActionListener() {
				
				@Override
				public void actionPerformed(ActionEvent e) {
					// TODO Auto-generated method stub
					result=0;
					textField.setText("0");
				}
			});
		}
		
		setBounds(200,200,300,300);
		setVisible(true);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
new jisuanqi3();
	}

}
